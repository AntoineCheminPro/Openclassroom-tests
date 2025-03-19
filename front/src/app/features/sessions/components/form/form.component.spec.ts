import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { FormComponent } from './form.component';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';
import { TeacherService } from '../../../../services/teacher.service';
import { Teacher } from '../../../../interfaces/teacher.interface';
import { Session } from '../../interfaces/session.interface';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockTeacherService: Partial<TeacherService>;
  let mockSessionService: Partial<SessionService>;
  let mockSessionApiService: Partial<SessionApiService>;
  let mockFormBuilder: FormBuilder;
  let mockActivatedRoute: any;
  let mockRouter: Partial<Router>;

  const teachersMock: Teacher[] = [
    {
      id: 1,
      lastName: 'teacher1_name',
      firstName: 'teacher1_firstname',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      lastName: 'teacher2_name',
      firstName: 'teacher2_firstname',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const session: Session = {
    name: 'none',
    description: '',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    teacher_id: 1,
    users: [1]
  };

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
      url: '/this_page'
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    mockTeacherService = {
      all: jest.fn().mockReturnValue(of(teachersMock)),
    };

    mockSessionService = {
      sessionInformation: {
        admin: true,
        id: 1,
        firstName: '',
        lastName: '',
        type: '',
        username: '',
        token: ''
      }
    };

    mockSessionApiService = {
      detail: jest.fn().mockReturnValue(of(session)),
      create: jest.fn().mockReturnValue(of(session)),
      update: jest.fn().mockReturnValue(of(session))
    };

    mockFormBuilder = new FormBuilder();

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, useValue: mockSessionApiService },
        { provide: TeacherService, useValue: mockTeacherService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: FormBuilder, useValue: mockFormBuilder }
      ],
      declarations: [FormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize teachers observable', () => {
    expect(component.teachers$).toBeDefined();

    if (component.teachers$) {
      component.teachers$.subscribe(teachers => {
        expect(teachers).toEqual(teachersMock);
      });
    }
  });

  it('should redirect non-admin users to the sessions page', () => {
    const routeSpy = jest.spyOn(mockRouter, 'navigate').mockImplementation(async () => true);

    mockSessionService.sessionInformation!.admin = false;

    component.ngOnInit();

    expect(routeSpy).toHaveBeenCalledWith(['/sessions']);
  });

  it('should initialize form with session data when URL includes "update"', () => {
    const updateUrl = '/update';
    Object.defineProperty(mockRouter, 'url', { get: () => updateUrl });

    component.ngOnInit();

    expect(component.onUpdate).toBe(true);
    expect(mockSessionApiService.detail).toHaveBeenCalled();
  });

  it('should submit a new session and redirect to the sessions page', () => {
    const snackBarOpenSpy = jest.spyOn(TestBed.inject(MatSnackBar), 'open').mockImplementation();

    component.onUpdate = false;
    component.sessionForm = mockFormBuilder.group({
      name: ['Yoga session 14-07-2024', [Validators.required]],
      date: [new Date('07/14/2024'), [Validators.required]],
      teacher_id: [1, [Validators.required]],
      description: ['Relaxing yoga session of Sunday', [Validators.required, Validators.max(2000)]]
    });

    component.submit();

    expect(mockSessionApiService.create).toHaveBeenCalled();
    expect(snackBarOpenSpy).toHaveBeenCalledWith('Session created !', 'Close', { duration: 3000 });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sessions']);
  });

  it('should update an existing session and redirect to the sessions page', () => {
    const snackBarOpenSpy = jest.spyOn(TestBed.inject(MatSnackBar), 'open').mockImplementation();

    component.onUpdate = true;
    component.sessionForm = mockFormBuilder.group({
      name: ['Yoga session 27-05-2024', [Validators.required]],
      date: [new Date(), [Validators.required]],
      teacher_id: ['1', [Validators.required]],
      description: ['Relaxing yoga session of Monday', [Validators.required, Validators.max(2000)]]
    });

    component.submit();

    expect(mockSessionApiService.update).toHaveBeenCalled();
    expect(snackBarOpenSpy).toHaveBeenCalledWith('Session updated !', 'Close', { duration: 3000 });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sessions']);
  });
});
