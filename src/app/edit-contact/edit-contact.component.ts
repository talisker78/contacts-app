import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words.validator';
import { ProfileIconSelectorComponent } from '../profile-icon-selector/profile-icon-selector.component';


@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
  providers: [ProfileIconSelectorComponent],
})
export class EditContactComponent implements OnInit {

  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  
  contactForm = this.fb.nonNullable.group({
    id: '',
    icon: '',
    personal: false,
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: '',
    favoritesRanking: <number | null>null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),
    address: this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: '',
    }),
    notes: ['', restrictedWords(['foo', 'bar', 'baz'])],
  });

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactsService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;
      this.contactForm.setValue(contact);
      console.log(contact.dateOfBirth, typeof contact.dateOfBirth);
    });
  }

  get firstName() { return this.contactForm.get('firstName') as FormControl; }
  get lastName() { return this.contactForm.get('lastName') as FormControl; }
  get notes() { return this.contactForm.get('notes') as FormControl; }
  
  get address() { return this.contactForm.get('address') as FormGroup; }
  saveContact() {
    console.log('Saving contact...');
    console.log(this.contactForm.value.dateOfBirth, typeof this.contactForm.value.dateOfBirth);
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => {
        console.log('Contact saved');
        this.router.navigate(['/contacts']);
      },
      error: (err: Error) => console.error('Error saving contact', err),
      complete: () => console.log('Save contact completed'),
    });
  }
}
