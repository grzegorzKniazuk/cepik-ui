import { ArrowUpComponent } from 'src/app/shared/components/arrow-up/arrow-up.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowService } from 'src/app/shared/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ArrowUpComponent', () => {

    let component: ArrowUpComponent;
    let fixture: ComponentFixture<ArrowUpComponent>;
    let windowServiceSpy: WindowService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ArrowUpComponent,
            ],
            providers: [
                {
                    provide: WindowService,
                    useValue: {
                        scrollTo: jasmine.createSpy('scrollTo'),
                    },
                },
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ArrowUpComponent);
        windowServiceSpy = TestBed.inject(WindowService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should render element if show$ is switched to true', () => {
        component.show$.next(false);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div'))).toBeNull();

        component.show$.next(true);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div'))).toBeTruthy();
    });

    it('should render element if show$ is switched to false', () => {
        component.show$.next(true);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div'))).toBeTruthy();

        component.show$.next(false);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div'))).toBeNull();
    });

    it('should call goToUp on click', () => {
        const goToUpSpy = spyOn(component, 'goToUp');

        component.show$.next(true);
        fixture.detectChanges();

        fixture.debugElement.query(By.css('div')).nativeElement.click();

        expect(goToUpSpy).toHaveBeenCalled();
    });

    it('should set show$ to false on element click', () => {
        component.show$.next(true);
        fixture.detectChanges();

        fixture.debugElement.query(By.css('div')).nativeElement.click();

        component.show$.subscribe((show) => {
            expect(show).toBeFalse();
        });
    });

    it('should call windowService.scrollTo on element click', () => {
        component.show$.next(true);
        fixture.detectChanges();

        fixture.debugElement.query(By.css('div')).nativeElement.click();

        expect(windowServiceSpy.scrollTo).toHaveBeenCalledWith({ left: 0, top: 0, behavior: 'smooth' });
    });
});
