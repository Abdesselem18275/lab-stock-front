import { Component, OnInit } from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product , Famille , Laboratoire} from 'src/app/model';
import { ProductsDataService } from '../../service/products-data.service';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product ;
  laboraoire: Laboratoire ;
  familles: Famille[];
  laboratoires: Laboratoire[];
  productForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private service: ProductsDataService,
    private fb: FormBuilder) {

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
  }

  ngOnInit() {

    this.service.get_elements('', 'famille').subscribe( (familles: Famille[]) => this.familles = familles);
    this.service.get_elements('', 'laboratoire').subscribe( (laboratoires: Laboratoire[]) => this.laboratoires = laboratoires);

    this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
    this.service.get_element(params.get('id'), 'product'))).
    subscribe((jsonItem: any) => {
      this.product = Product.fromJson(jsonItem);
      this._updateFrom(this.product);
    });

    }




  private _updateFrom (product: Product) {
    this.productForm.patchValue({
      designation : product.designation,
      reference : product.reference,
      laboratoire : product.laboratoire !== null ? product.laboratoire.designation : null,
      famille : product.famille !== null ? product.famille.designation : null,
      conditionnement : {
      contenantCoffret : product.contenantCoffret,
      testContenant : product.testContenant},
      stock : {
      cmm : product.cmm,
      stockMiniMois : product.StockMiniMois}
    });

  }

  onSubmit() {

    this.product = new Product({
         id : this.product.id,
         reference : this.productForm.value.reference,
         designation : this.productForm.value.designation,
         famille : this.productForm.value.famille,
         laboratoire :  this.productForm.value.laboratoire,
         contenantCoffret : this.productForm.value.conditionnement.contenantCoffret,
         testContenant : this.productForm.value.conditionnement.testContenant,
         cmm :  this.productForm.value.stock.cmm,
         StockMiniMois : this.productForm.value.stock.stockMiniMois,
         creation_date : this.product.creation_date
        });

    // console.warn(JSON.stringify(this.product));
    this.service.update_element(this.product.id, JSON.stringify(this.product), 'product').
    subscribe(x => console.log(x));
  }


  onDelete() {
    this.service.delete_element(this.product.id, 'product').
    subscribe(x => console.log(x));

  }

}
