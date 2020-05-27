export class CalculatorUtil {

  static calculateMaxOutput(inputUsage: number, inputUsagePerMinute, outputPerMinute): CalculationMaxOutputResult {
    const output = (inputUsage / inputUsagePerMinute) * outputPerMinute;

    return {
      maxOutput: Math.round((output + Number.EPSILON) * 100) / 100,
      calculationMaxOutput: output
    };
  }

  static calculateWithPercentageOptimization(
    outputPerMinute: number,
    calculationMaxOutput: number
  ): CalculateMachinesAndPercentageResult {
    let i = 100;
    let machines = 0;
    do {
      const percentageOutput = (outputPerMinute * (i / 100));
      machines = calculationMaxOutput / percentageOutput;
      i--;
    } while (machines !== 0 && (machines - Math.floor(machines)) !== 0 && i > 0);

    if (machines - Math.floor(machines) !== 0) {
      return undefined;
    }
    return {
      machines,
      percentage: i + 1
    };
  }

  static calculateWithLeastNumberOfMachines(
    input: number,
    inputPerMinute: number): CalculateMachinesAndPercentageResult[] {
    let result: CalculateMachinesAndPercentageResult[] = [];

    const machines = Math.floor(input / inputPerMinute);
    const rest = input % inputPerMinute;

    result.push({
      machines,
      percentage: 100
    });

    if (rest > 0) {
      result = [...result, ...this.continueWithRest(rest, inputPerMinute)];
    }

    return result;
  }

  private static continueWithRest(input, inputPerMinute): CalculateMachinesAndPercentageResult[] {
    let result: CalculateMachinesAndPercentageResult[] = [];
    const percentage = Math.floor((input / inputPerMinute) * 100);
    const rest = input - (inputPerMinute * (percentage / 100));
    result.push({
      machines: 1,
      percentage
    });

    if (Math.round(rest / input) > 0) {
      result = [...result, ...this.continueWithRest(rest, inputPerMinute)];
    }

    return result;
  }

}

export interface CalculationMaxOutputResult {
  maxOutput: number;
  calculationMaxOutput: number;
}

export interface CalculateMachinesAndPercentageResult {
  machines: number;
  percentage: number;
}
