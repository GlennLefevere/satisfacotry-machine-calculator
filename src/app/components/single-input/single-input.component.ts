import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

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
  percentage = 0;
  machines = 0;

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
    this.subs.push(this.singleInputForm.valueChanges.subscribe(
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
    this.maxOutput = (this.input.value / this.requiredPerMinute.value) * this.outputPerMinute.value;
  }

  private calculateIdealMachinesAndPercentage() {
    let i = 100;
    let machines = 0;
    do {
      const percentageOutput = (this.outputPerMinute.value * (i / 100));
      machines = this.maxOutput / percentageOutput;
      i--;
    } while (machines !== 0 && (machines - Math.floor(machines)) !== 0 && i > 0);

    this.machines = machines;
    this.percentage = i + 1;
  }

}
