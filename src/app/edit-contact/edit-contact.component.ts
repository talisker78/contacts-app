import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { addressTypeValues, phoneTypeValues } from '../contacts/contact.model';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {

  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  
  contactForm = this.fb.nonNullable.group({
    id: '',
    personal: false,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    favoritesRanking: <number | null>null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),
    address: this.fb.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    }),
    notes: '',
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
