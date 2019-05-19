import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {RepeatTimesOfContext} from './repeat-times-of.context';

@Directive({
  selector: '[dyRepeatTimes][dyRepeatTimesOf]',
})
export class RepeatTimesOfDirective {
  private _previousCount = 0;

  public constructor(
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _templateRef: TemplateRef<RepeatTimesOfContext>,
  ) {}

  @Input()
  public set dyRepeatTimesOf(count: number) {
    for (let index = this._previousCount - 1; index >= count; index--) {
      this._viewContainerRef.remove(index);
    }

    for (let index = this._previousCount; index < count; index++) {
      this._viewContainerRef.createEmbeddedView<RepeatTimesOfContext>(
        this._templateRef,
        new RepeatTimesOfContext(index),
        index,
      );
    }

    this._previousCount = count;
  }
}
