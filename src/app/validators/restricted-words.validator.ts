import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

export function restrictedWords(words: string[])  
{
  return  (control: AbstractControl): ValidationErrors | null =>
    {
        if (!words) return null;
        const invalidWords = words
            .map(w => (control.value.toUpperCase().includes(w.toUpperCase()) ? w : null))
            .filter(w => w != null);
        return invalidWords && invalidWords.length > 0
            ? { restrictedWords: invalidWords.join(', ') }
            : null;
    }
}