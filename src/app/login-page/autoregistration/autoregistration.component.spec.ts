import { of } from 'rxjs';
import { AutoregistrationComponent } from './autoregistration.component';
import {
  createFailedRemoteDataObject,
  createSuccessfulRemoteDataObject,
} from '../../shared/remote-data.utils';

describe('AutoregistrationComponent verification', () => {
  let component: AutoregistrationComponent;
  let requests: any;
  let responses: any;
  let notifications: any;
  let store: any;
  let redirect: any;

  beforeEach(() => {
    requests = jasmine.createSpyObj('requests', ['generateRequestId', 'send']);
    requests.generateRequestId.and.returnValue('verification-request');
    responses = jasmine.createSpyObj('responses', ['buildFromRequestUUID']);
    notifications = jasmine.createSpyObj('notifications', ['error']);
    store = jasmine.createSpyObj('store', ['dispatch']);
    redirect = jasmine.createSpyObj('redirect', ['redirect']);
    component = new AutoregistrationComponent(null, requests,
      { getRootHref: () => 'https://repository.auth.test/repository/server/api' } as any,
      responses, notifications, { instant: (key: string) => key } as any,
      null, null, store, redirect);
    component.verificationToken = 'synthetic-credential';
    component.baseUrl = 'https://repository.auth.test/repository';
  });

  it('reports an invalid or expired confirmation instead of waiting indefinitely', () => {
    responses.buildFromRequestUUID.and.returnValue(of(createFailedRemoteDataObject('expired', 404)));
    component.sendAutoregistrationRequest();
    expect(notifications.error).toHaveBeenCalledWith('clarin.autoregistration.error.message');
    expect(requests.send).toHaveBeenCalledTimes(1);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('reports a consumed credential rejected by the callback', () => {
    responses.buildFromRequestUUID.and.returnValues(
      of(createSuccessfulRemoteDataObject({})), of(createFailedRemoteDataObject('used', 401)));
    component.sendAutoregistrationRequest();
    expect(notifications.error).toHaveBeenCalledWith('clarin.autologin.error.message');
    expect(requests.send).toHaveBeenCalledTimes(2);
    expect(redirect.redirect).not.toHaveBeenCalled();
  });

  it('accepts the callback token without depending on frontend token deletion', () => {
    responses.buildFromRequestUUID.and.returnValues(
      of(createSuccessfulRemoteDataObject({})), of(createSuccessfulRemoteDataObject('Bearer synthetic-jwt')));
    component.sendAutoregistrationRequest();
    expect(store.dispatch).toHaveBeenCalled();
    expect(redirect.redirect).toHaveBeenCalledWith('https://repository.auth.test/repository/home');
    expect(notifications.error).not.toHaveBeenCalled();
  });
});
