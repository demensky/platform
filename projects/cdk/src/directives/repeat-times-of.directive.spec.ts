import {Component, ElementRef} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RepeatTimesOfDirective} from './repeat-times-of.directive';

describe('RepeatTimesOfDirective', () => {
  @Component({
    template: `
      <span *dyRepeatTimes="let index of count">{{ index.toString() }};</span>
    `,
  })
  class TestComponent {
    public count = 0;

    public constructor(
      protected readonly _elementRef: ElementRef<HTMLElement>,
    ) {}

    public getText(): string {
      // tslint:disable-next-line:no-non-null-assertion
      return this._elementRef.nativeElement.textContent!.replace(/[^\d;]/g, '');
    }
  }

  let fixture: ComponentFixture<TestComponent>;

  function setupInputs(count: number): void {
    fixture.componentInstance.count = count;
    fixture.detectChanges();
  }

  function getResult(): string {
    return fixture.componentInstance.getText();
  }

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [RepeatTimesOfDirective, TestComponent],
    }).createComponent(TestComponent);
  });

  describe('initial', () => {
    it('0', () => {
      setupInputs(0);

      expect(getResult()).toBe('');
    });

    it('2', () => {
      setupInputs(2);

      expect(getResult()).toBe('0;1;');
    });

    it('4', () => {
      setupInputs(4);

      expect(getResult()).toBe('0;1;2;3;');
    });
  });

  describe('update', () => {
    it('from 0 to 4', () => {
      setupInputs(0);
      setupInputs(4);

      expect(getResult()).toBe('0;1;2;3;');
    });

    it('from 2 to 4', () => {
      setupInputs(2);
      setupInputs(4);

      expect(getResult()).toBe('0;1;2;3;');
    });

    it('from 4 to 2', () => {
      setupInputs(4);
      setupInputs(2);

      expect(getResult()).toBe('0;1;');
    });

    it('from 4 to 0', () => {
      setupInputs(4);
      setupInputs(0);

      expect(getResult()).toBe('');
    });
  });
});
