import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Model, ModelId } from '../models/model';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

export interface IQueryParams {
  [key: string]: string;
}

export interface IResponseMeta {
  number: number;
  size: number;
  total: number;
}

export interface IListResponse<T extends Model> {
  meta: IResponseMeta;
  data: T[];
}

export declare type ModelConstructor<T> = { new (json: Object): T };

/**
 * Base service class with CRUD methods
 * @example
 * For usage in a service add a RestServiceConfig decorator with properties
 * entityName: 'someName' and entityConstructor: NewModel
 * NewModel - it is a specific model that is extended by a Model
 * also service should extends this RestService<NewModel>
 *
 * @Defaults({
 *   name: ''
 * })
 * class UserModel extends Model {
 *   public name: string;
 * }
 *
 * @RestServiceConfig({
 *   entityName: 'user',
 *   entityConstructor: UserModel
 * })
 * class UserService extends RestService<UserModel> {
 * }
 *
 * */
@Injectable()
export class RestService<T extends Model> {
  protected _host: string = Config.API;
  protected _endpoint: string;
  protected _entityName: string;
  protected _entityConstructor: ModelConstructor<T>;

  constructor(protected _http: Http,
              protected _authService: AuthService,
              protected _router: Router,
              protected _notificationService: NotificationService) {
  }

  /**
   * Create a new instance of related Model
   * @param json
   * @returns {T}
   */
  public createEntity(json?: Object): T {
    return new this._entityConstructor(json);
  }

  /**
   * Get list of data from API
   * @return {Observable<IListResponse<T>>}
   */
  public list(queryParams?: IQueryParams): Observable<IListResponse<T>> {
    return this._http.get(this._getRequestParams(undefined, queryParams), this._getRequestOptions())
      .map((response: Response) => response.json())
      .map((json: any) => Object.assign(json, { data: json.data.map((x: any) => this.createEntity(x)) }))
      .catch((error: any) => this._handleErrors(error));
  }

  /**
   * Get a record of data by ID from API
   * @params {number} id of record
   * @return {Observable<T>}
   */
  public get(id: ModelId): Observable<T> {
    return this._http.get(this._getRequestParams(id), this._getRequestOptions())
      .map((response: Response) => response.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }

  /**
   * Save record of data
   * @params {T} model
   * @return {Observable<T>}
   */
  public save(model: T): Observable<T> {
    if (model.id !== undefined) {
      return this._update(model);
    } else {
      return this._create(model);
    }
  }

  /**
   * Delete record of data by ID
   * @params {number} id of record
   * @return {Observable<void>}
   */
  public delete(id: ModelId): Observable<void> {
    let requestParams = this._getRequestParams(id);
    let requestOptions = this._getRequestOptions();

    return this._http.delete(requestParams, requestOptions)
      .catch((error: Response) => this._handleErrors(error));
  }

  /**
   * Update record of data
   * @params {T} model
   * @return {Observable<T>}
   */
  protected _update(model: T): Observable<T> {
    let requestParams = this._getRequestParams(model.id);
    let json = model.toJson();
    let requestOptions = this._getRequestOptions();

    return this._http.put(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }

  /**
   * Create a new one record of data
   * @params {T} model
   * @return {Observable<T>}
   */
  protected _create(model: T): Observable<T> {
    let requestParams = this._getRequestParams();
    let json = model.toJson();
    let requestOptions = this._getRequestOptions();

    return this._http.post(requestParams, json, requestOptions)
      .map((res: Response) => res.json())
      .map((json: any) => this.createEntity(json))
      .catch((error: Response) => this._handleErrors(error));
  }

  /**
   * Get full path with request params
   * @params {number} id
   * @return {Observable<T>}
   */
  protected _getRequestParams(id?: ModelId, params?: IQueryParams, anotherId?: ModelId, entity?: string) {
    let path: string[] = [];

    path.push(this._host);
    path.push(this._endpoint);
    path.push(this._entityName);

    if (id !== undefined) {
      path.push(id.toString());
    }

    if (anotherId !== undefined && entity !== undefined) {
      path.push(entity);
      path.push(anotherId.toString());
    }

    path = path.filter(part => part && part !== '');

    let paramsString = '';

    if (params) {
      let param = Object.entries(params).map(([key, value]) => key + '=' + value);
      paramsString = '?' + param.join('&');
    }
    return path.join('/') + paramsString;
  }

  /**
   * Common request params for requests
   * @return {object}
   */
  protected _getRequestOptions() {
    let headers = new Headers({
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json'
    });

    if (this._authService.isLoggedIn) {
      headers.append('X-Auth-Token', this._authService.token);
    }

    return new RequestOptions({
      headers: headers
    });
  }

  /**
   * Handler of errors for the CRUD methods
   */
  protected _handleErrors(error: Response) {
    if (error.status === 401) {
      this._router.navigate(['/login']);
      return Observable.throw(error);
    } else if (error.status === 409) {
      this._notificationService.error(error.json().message, `${error.status} ${error.statusText}`);
      return Observable.throw(error);
    } else {
      this._notificationService.error(error.json().message, `${error.status} ${error.statusText}`);
      return Observable.throw(error);
    }
  }
}

