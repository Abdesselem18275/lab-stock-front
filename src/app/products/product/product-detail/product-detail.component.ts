import { Component, OnInit } from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product , Famille , Laboratoire} from 'src/app/model';
import { ProductsDataService } from '../../service/products-data.service';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product ;
  server_error: any;
  laboraoire: Laboratoire ;
  familles: Famille[];
  laboratoires: Laboratoire[];
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsDataService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router) {

      this.productForm = this.fb.group({
        designation : ['', Validators.required],
        reference : ['', Validators.required],
        laboratoire : ['', Validators.required],
        famille : ['', Validators.required],
        conditionnement : this.fb.group({
        contenantCoffret : ['', Validators.required],
        testContenant : ['', Validators.required]}),
        stock : this.fb.group({
        cmm : ['', Validators.required],
        stockMiniMois : ['', Validators.required]})
      });
      this.server_error = {};
  }

  ngOnInit() {
    this.service.get_elements('', 'famille').subscribe((familles: Famille[]) => this.familles = familles);
    this.service.get_elements('', 'laboratoire').subscribe((laboratoires: Laboratoire[]) => this.laboratoires = laboratoires);
    this.route.paramMap.pipe(
         switchMap((params: ParamMap) => this.service.get_element(params.get('id'), 'product'))).
         subscribe((jsonItem: any) => {
                    this.product = Product.fromJson(jsonItem);
                    this._updateFrom(this.product); } );

    }




  private _updateFrom (product: Product) {
    this.productForm.patchValue({
      designation : product.designation,
      reference : product.reference,
      laboratoire : product.laboratoire !== null ? product.laboratoire.id : '',
      famille : product.famille !== null ? product.famille.id : '',
      conditionnement : {
      contenantCoffret : product.contenantCoffret,
      testContenant : product.testContenant},
      stock : {
      cmm : product.cmm,
      stockMiniMois : product.StockMiniMois}
    }); }

  onSubmit() {

    const element: HTMLElement = document.getElementById('submit-button') as HTMLElement ;
    element.click();
    this.product = Product.fromFrom(this.productForm, this.product.id);
    this.service.update_element(this.product.id, JSON.stringify(this.product), 'product').
          subscribe((product: Product) =>  {
              this.product = Product.fromJson(product);
              this.snackBar.open('Element ajouter', '' , {duration: 1000, }); },
              error => {this.server_error = error.error ; this.snackBar.open('Erreur');  console.warn(this.server_error); }
          ); }

  onDelete() {
    this.service.delete_element(this.product.id, 'product').
    subscribe(() => { this.snackBar.open('Element supprimer', '' , {duration: 1000, });
                      this.router.navigate(['../list'], { relativeTo: this.route } ) ; });
                    }
}
