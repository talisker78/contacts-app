import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contactForm = new FormGroup( {
    firstName: new FormControl(),
    lastName: new FormControl(),
    dateOfBirth: new FormControl(),
    favoritesRanking: new FormControl(),

  });



  constructor(private route: ActivatedRoute, private contactsService: ContactsService, private router: Router ) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe(contact => {
      if(!contact) return;
      this.contactForm.controls.firstName.setValue(contact.firstName);
      this.contactForm.controls.lastName.setValue(contact.lastName);
      this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth);
      this.contactForm.controls.favoritesRanking.setValue(contact.favoritesRanking);
    });
  }

  saveContact() {
    console.log("Saving contact...");
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => {
        console.log('Contact saved');
        this.router.navigate(['/contacts']);
      },
      error: (err: Error) => console.error('Error saving contact', err),
      complete: () => console.log('Save contact completed')
    });
  }
}
