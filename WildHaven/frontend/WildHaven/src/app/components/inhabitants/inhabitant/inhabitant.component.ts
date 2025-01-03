import { Component, OnInit } from "@angular/core"
import {Router, ActivatedRoute, Params } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InhabitantService } from "../../../services/inhabitant.service";
import { Inhabitant } from "../../../models/inhabitant";

import { GLOBAL } from "../../../services/global";
import { Zone } from "../../../models/zone";
import { Specie } from "../../../models/specie";

@Component({
    selector: 'inhabitant',
    templateUrl: './inhabitant.component.html',
    standalone: true,
    imports: [FormsModule, CommonModule],
    providers: [InhabitantService]

})

export class InhabitantComponent implements OnInit{

    public url: string;
    public inhabitant: Inhabitant;
    private status: String;
    public title: String;

    constructor(        
        private _route: ActivatedRoute,
        private _router: Router,
        private _inhabitantService: InhabitantService
    ){
        this.inhabitant = new Inhabitant(
            "", "", "", "", "", "", new Date(), [{
                date: new Date(),
                reason: "",
                treatments: "",
                vetName: "",
            }], true,new Specie("", "", "", "", "", ""), new Zone("", "", "", "")
        );
        this.status = ""
        this.title = "Zona"
        this.url = GLOBAL.urlUploads + 'inhabitants/';
    }

    ngOnInit() {
        const id = this._route.snapshot.paramMap.get('id');
        this._inhabitantService.getInhabitant(id).subscribe(
            response => {
                this.inhabitant = response.inhabitant;
            },
            error => {
                console.log(<any>error);
                if(<any>error != null){
                    this.status = 'error';
                }
            }
        );
    }


}