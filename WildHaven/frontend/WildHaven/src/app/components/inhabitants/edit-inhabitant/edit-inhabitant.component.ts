import { Component, OnInit } from "@angular/core"
import {Router, ActivatedRoute, Params } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InhabitantService } from "../../../services/inhabitant.service";
import { Inhabitant } from "../../../models/inhabitant";
import { GLOBAL } from "../../../services/global";
import { routes } from "../../../app.routes";
import { Specie } from "../../../models/specie";
import { Zone } from "../../../models/zone";
import { ZoneService } from "../../../services/zone.service";
import { SpecieService } from "../../../services/specie.service";

@Component({
    selector: 'inhabitant',
    templateUrl: './edit-inhabitant.component.html',
    standalone: true,
    imports: [FormsModule, CommonModule],
    providers: [InhabitantService]

})

export class EditInhabitantComponent implements OnInit{

    public url: String;
    public inhabitant: Inhabitant;
    private status: String;
    public title: String;

    public zones: Zone[];
    public species: Specie[]

    constructor(        
        private _route: ActivatedRoute,
        private _router: Router,
        private _inhabitantService: InhabitantService,
        private _zoneService: ZoneService,
        private _specieService: SpecieService
    ){
        this.inhabitant = new Inhabitant("","","","", "", "", undefined, [{
            date: undefined,
            reason: "",
            treatments:"",
            vetName: ""
        }], false, undefined, undefined);
        this.status = ""
        this.title = "Modificar habitante"
        this.url = GLOBAL.url;
        this.zones = []
        this.species = []
    }


    ngOnInit(): void {
        console.log("Componente inhabitant-edit cargado")    

        const id = this._route.snapshot.paramMap.get('id');

        this._inhabitantService.getInhabitant(id).subscribe(
            response => {
                this.inhabitant = response.inhabitant;
                this.inhabitant.birth = response.inhabitant.birth.split("T")[0]; // Extrae solo la parte de la fecha
            },
            error => {
                console.log(<any>error);
                if(<any>error != null){
                    this.status = 'error';
                }
            }
        );

        
        this._zoneService.getZones().subscribe(
            response => {
                if(!response.zones){
                    this.status = "error"
                }
                else{
                    this.status = "success"
                    this.zones = response.zones
                }
            }
        )

        this._specieService.getSpecies().subscribe(
            response => {
                if(!response.species){
                    this.status = "error"
                }
                else{
                    this.status = "success"
                    this.species = response.species
                }
            }
        )
    }

    onImageSelected(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.inhabitant.image = event.target.files[0];
        }
    }

    onSubmit(form: any){
        const id = this._route.snapshot.paramMap.get('id');

        this._inhabitantService.updateInhabitant(id, this.inhabitant).subscribe(
            response => {
                if(!response.inhabitant){
                    this.status = "error"
                }
                else{
                    this.status = "success"
                    this.inhabitant = response.inhabitant;
                }
                this._router.navigate(['/inhabitants']); // Redirige a la lista de einhabitants
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = "error";
                }
            }
        )
    }


}