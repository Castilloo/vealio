import { AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateNotBePast(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate < today) {
        return { dateNotBePast: true };
    }
    return null;
}

export function atLeastOneSkillRequired(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const skillsArray = control as FormArray;
        return skillsArray.length > 0 ? null : { 'atLeastOneSkillRequired': true };
    };
}

export function skillsValidator(control: AbstractControl): ValidationErrors | null {
    const skillsArray = control.value as Array<any>;

    if (!skillsArray || skillsArray.length === 0) {
        return { required: true }; // Retorna un error si el array está vacío
    }
    return null; // Si tiene habilidades, retorna null
}