export interface IBMI {
  bmi: number;
  status: string;
}

/**
 * Calculate BMI (Body Mass Index)
 * 
 * Formula: 703 x weight (lbs) / [height (in)]2
 * 
 * @param hFeet Feet value in number
 * @param hInch Inch value in number
 * @param wKg Weight in KG
 * @returns {IBMI}
 */
export function calculateBMI(heightFeet: number, heightInches: number, weightKg: number): IBMI {
  if (heightFeet <= 0 || weightKg <= 0) {
    return { bmi: 0, status: "" };
  }

  const heightInchesTotal = (parseFloat(heightFeet + '') * 12) + parseFloat(heightInches + '');
  const weightPounds = weightKg * 2.2;

  const bmi = (weightPounds / Math.pow(heightInchesTotal, 2)) * 703;
  const bmiRounded = parseFloat(bmi.toFixed(2));

  let status = "";
  if (bmiRounded < 18.5) {
    status = "Underweight";
  } else if (bmiRounded < 25) {
    status = "Normal weight";
  } else if (bmiRounded < 30) {
    status = "Overweight";
  } else {
    status = "Obese";
  }

  return { bmi: bmiRounded, status: status };
}

export const calculateAge = (birthDate: Date): number => {
  // if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
  //   throw new Error('Invalid birth date');
  // }

  const prevBirthdate = new Date(Date.parse(birthDate));
  const today: Date = new Date();
  let age: number = today.getFullYear() - prevBirthdate.getFullYear();
  const monthDifference: number = today.getMonth() - prevBirthdate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < prevBirthdate.getDate())) {
    age--;
  }

  return Math.round(age);
}
