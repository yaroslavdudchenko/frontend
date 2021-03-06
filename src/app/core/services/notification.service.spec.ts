/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

describe('Notification Service', () => {
  let testService: NotificationService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        NotificationService,
        { provide: ToastrService, useValue: {} },
        { provide: TranslateService, useValue: {} },
      ]
    });
    injector = getTestBed();
    testService = injector.get(NotificationService);
  });

  afterEach(() => {
    injector = undefined;
    testService = undefined;
  });

  it('should be defined', () => {
    expect(NotificationService).toBeDefined();
    expect(testService).toBeDefined();
    expect(testService instanceof NotificationService).toBeTruthy();
  });

  it('should support 4 types of notifications', () => {
    // success
    const testSuccess = spyOn(testService, 'success');
    testService.success('success');
    expect(testSuccess).toHaveBeenCalled();

    // warning
    const testWarning = spyOn(testService, 'warning');
    testService.warning('warning');
    expect(testWarning).toHaveBeenCalled();

    // info
    const testInfo = spyOn(testService, 'info');
    testService.info('info');
    expect(testInfo).toHaveBeenCalled();

    // error
    const testError = spyOn(testService, 'error');
    testService.error('error');
    expect(testError).toHaveBeenCalled();
  });
});
