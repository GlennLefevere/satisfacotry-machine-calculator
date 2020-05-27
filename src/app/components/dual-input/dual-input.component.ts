import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CalculateMachinesAndPercentageResult, CalculatorUtil} from '../../utils/calculator.util';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-dual-input',
  templateUrl: './dual-input.component.html',
  styleUrls: ['./dual-input.component.scss']
})
export class DualInputComponent implements OnInit, OnDestroy {

  dualInputForm = this.formBuilder.group({
    inputOne: ['', Validators.required],
    requiredPerMinuteOne: ['', Validators.required],
    inputTwo: ['', Validators.required],
    requiredPerMinuteTwo: ['', Validators.required],
    outputPerMinute: ['', Validators.required]
  });

  maxOutput = 0;
  private calculationMaxOutput = 0;
  calculation: CalculateMachinesAndPercentageResult[] = [];
  calculation2: CalculateMachinesAndPercentageResult;

  get inputOne() {
    return this.dualInputForm.get('inputOne');
  }

  get requiredPerMinuteOne() {
    return this.dualInputForm.get('requiredPerMinuteOne');
  }

  get inputTwo() {
    return this.dualInputForm.get('inputTwo');
  }

  get requiredPerMinuteTwo() {
    return this.dualInputForm.get('requiredPerMinuteTwo');
  }

  get outputPerMinute() {
    return this.dualInputForm.get('outputPerMinute');
  }

  private subs: Subscription[] = [];

  private inputUsage = 0;
  private inputUsagePerMinute = 0;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.dualInputForm.valueChanges
        .pipe(debounceTime(600))
        .subscribe(_ => {
          if (this.dualInputForm.valid) {
            this.determineInputUsage();
            this.calculateMaxOutput();
            this.calculateIdealMachinesAndPercentage();
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private determineInputUsage() {
    if ((this.inputOne.value / this.requiredPerMinuteOne.value) > (this.inputTwo.value / this.requiredPerMinuteTwo.value)) {
      this.useInputTwo();
    } else {
      this.useInputOne();
    }
  }

  private useInputOne() {
    this.inputUsage = this.inputOne.value;
    this.inputUsagePerMinute = this.requiredPerMinuteOne.value;
  }

  private useInputTwo() {
    this.inputUsage = this.inputTwo.value;
    this.inputUsagePerMinute = this.requiredPerMinuteTwo.value;
  }

  private calculateMaxOutput() {
    const {maxOutput, calculationMaxOutput} = CalculatorUtil
      .calculateMaxOutput(this.inputUsage, this.inputUsagePerMinute, this.outputPerMinute.value);

    this.maxOutput = maxOutput;
    this.calculationMaxOutput = calculationMaxOutput;
  }

  private calculateIdealMachinesAndPercentage() {
    this.calculation = CalculatorUtil
      .calculateWithLeastNumberOfMachines(this.inputUsage, this.inputUsagePerMinute);
    this.calculation2 = CalculatorUtil.calculateWithPercentageOptimization(this.outputPerMinute.value, this.calculationMaxOutput);
  }

}
