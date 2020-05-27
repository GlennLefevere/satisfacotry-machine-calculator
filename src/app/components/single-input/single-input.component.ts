import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CalculateMachinesAndPercentageResult, CalculatorUtil} from '../../utils/calculator.util';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-single-input',
  templateUrl: './single-input.component.html',
  styleUrls: ['./single-input.component.scss']
})
export class SingleInputComponent implements OnInit, OnDestroy {

  singleInputForm = this.formBuilder.group({
    input: ['', Validators.required],
    requiredPerMinute: ['', Validators.required],
    outputPerMinute: ['', Validators.required]
  });

  maxOutput = 0;

  calculation: CalculateMachinesAndPercentageResult[] = [];
  calculation2: CalculateMachinesAndPercentageResult;

  private subs: Subscription[] = [];

  get input() {
    return this.singleInputForm.get('input');
  }

  get requiredPerMinute() {
    return this.singleInputForm.get('requiredPerMinute');
  }

  get outputPerMinute() {
    return this.singleInputForm.get('outputPerMinute');
  }

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.subs.push(this.singleInputForm.valueChanges
      .pipe(debounceTime(600))
      .subscribe(
        _ => {
          if (this.singleInputForm.valid) {
            this.calculateMaxOutput();
            this.calculateIdealMachinesAndPercentage();
          }
        }
      ));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private calculateMaxOutput() {
    const {maxOutput} = CalculatorUtil.calculateMaxOutput(this.input.value, this.requiredPerMinute.value, this.outputPerMinute.value);
    this.maxOutput = maxOutput;
  }

  private calculateIdealMachinesAndPercentage() {
    this.calculation = CalculatorUtil
      .calculateWithLeastNumberOfMachines(this.input.value, this.requiredPerMinute.value);
    this.calculation2 = CalculatorUtil.calculateWithPercentageOptimization(this.outputPerMinute.value, this.maxOutput);
  }

}
