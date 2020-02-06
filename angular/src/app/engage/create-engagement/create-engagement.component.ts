import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';



@Component({
  selector: 'app-create-engagement',
  templateUrl: './create-engagement.component.html',
  styleUrls: ['./create-engagement.component.css']
})
export class CreateEngagementComponent implements OnInit {

  engagementForm = new FormGroup({
    date: new FormControl(''),
    title: new FormControl(''),
    message: new FormControl(''),
    outcome: new FormControl(''),
    type: new FormControl(''),

  });

  constructor(@Inject(MAT_DIALOG_DATA) public engagement: any, private formBuilder: FormBuilder) { }
  
 
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top'
    
};
  ngOnInit() {

    this.engagementForm = this.formBuilder.group({
      date: [this.engagement.dataKey.date],
      title: [this.engagement.dataKey.title],
      message: [this.engagement.dataKey.message],
      outcome: [this.engagement.dataKey.outcome],
      type: [this.engagement.dataKey.type],
    




    });
  }

  create(){}

}
