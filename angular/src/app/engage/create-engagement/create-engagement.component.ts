import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EngagementService } from '../engage.service';



@Component({
  selector: 'app-create-engagement',
  templateUrl: './create-engagement.component.html',
  styleUrls: ['./create-engagement.component.css']
})
export class CreateEngagementComponent implements OnInit {

  channels: any;

  recurrences: any;
  selectedRecurrence: any;
  date = new FormControl(new Date());
  


  engagementForm = new FormGroup({
    date: new FormControl(''),
    title: new FormControl(''),
    message: new FormControl(''),
    outcome: new FormControl(''),
    type: new FormControl(''),

  });

  constructor(@Inject(MAT_DIALOG_DATA) public engagement: any, private formBuilder: FormBuilder,
              private engagementService: EngagementService,     private dialogRef: MatDialogRef<CreateEngagementComponent>,

   ) { }
  
 
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
    sanitize: false,
    toolbarPosition: 'top'
    
};
  ngOnInit() {


    this.engagementService.getNetworks("","asc","",0,0).subscribe(
      response => { 
       
        this.channels = response;

      }
    )

    this.engagementService.getRecurrences().subscribe(
      response =>  {
        this.recurrences = response;
      }
    )




  }

  get f() { return this.engagementForm.controls; }

  changeRecurrence(ev){
    this.selectedRecurrence = ev.value;
  }

  
  create(){

    let channels = [];
    this.channels.forEach(element => {

     
      if(element.checkedOrUnchecked){
        channels.push({channelId:element.id})
      }
      
    });

    this.engagementService.createEngagement(
      {channels: channels, title: this.f.title.value, date: this.date.value, message: this.f.message.value, recurrence:this.selectedRecurrence }).subscribe(
        val => {
         
          if(val.status === 200){
            this.dialogRef.close();
          }
          
        }
      )
  }

}
