import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words.validator';
import { ProfileIconSelectorComponent } from '../profile-icon-selector/profile-icon-selector.component';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
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
    phones: this.fb.array([this.createPhoneGroup()]),
    addresses: this.fb.array([this.createAddressGroup()]),
    notes: ['', restrictedWords(['foo', 'bar'])],
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

      for (let i = 1; i < contact.phones.length; i++) {
        this.addPhone();
      }

      this.contactForm.setValue(contact);
      console.log(contact.dateOfBirth, typeof contact.dateOfBirth);
    });
  }
  createPhoneGroup() {
    const phoneGroup = this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
      preferred: false,
    });
    phoneGroup.controls.preferred.valueChanges.subscribe((value) => {
      if (value)
        phoneGroup.controls.phoneNumber.addValidators([Validators.required]);
      else phoneGroup.controls.phoneNumber.clearValidators();

      phoneGroup.controls.phoneNumber.updateValueAndValidity();
    });
    return phoneGroup;
  }

  addPhone() {
    this.contactForm.controls.phones.push(this.createPhoneGroup());
  }

  createAddressGroup() {
    return this.fb.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    });
  }

  addAddress() {
    this.contactForm.controls.addresses.push(this.createAddressGroup());
  }
  get firstName() {
    return this.contactForm.controls.firstName;
  }

  get notes() {
    return this.contactForm.controls.notes;
  }
  saveContact() {
    console.log(
      this.contactForm.value.dateOfBirth,
      typeof this.contactForm.value.dateOfBirth
    );
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts']),
    });
  }
}
