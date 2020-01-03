import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take, distinctUntilChanged } from 'rxjs/operators';

import { IngredientService } from '../state/ingredient.service';
import { IngredientQuery } from '../state/ingredient.query';
import { Ingredient, createIngredient } from '../../shared/ingredient.model';
import { IngredientForm } from '../ingredient-form';
import { IngredientStore } from '../state/ingredient.store';
import { MessageService } from '../../shared/message.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) formRef: FormGroupDirective;
  unsubscribe$ = new Subject<null>();
  loading$: Observable<boolean>;
  ingredientForm = new IngredientForm();
  ingredientColumns: string[] = ['select', 'name', 'amount'];
  datasource = new MatTableDataSource<Ingredient>([]);
  selection = new SelectionModel<Ingredient>(true, []);

  constructor(
    private auth: AuthService,
    private service: IngredientService,
    private query: IngredientQuery,
    private store: IngredientStore,
    private message: MessageService
  ) {}

  ngOnInit() {
    this.query
      .selectAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(ingredients => {
        this.datasource.data = ingredients;
      });
    this.loading$ = this.query.selectLoading();
    this.query
      .selectActive()
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged((a, b) => {
          if (a === b) {
            return true;
          }

          if (a && b && a.id === b.id) {
            return true;
          }

          return false;
        })
      )
      .subscribe(ingredient => {
        if (ingredient) {
          this.ingredientForm.patchValue(ingredient);
        } else {
          this.ingredientForm = new IngredientForm();
        }
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;

    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.datasource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Ingredient): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name
    }`;
  }

  edit(row: Ingredient) {
    this.service
      .syncActive({ id: row.id })
      .pipe(take(1))
      .subscribe();
  }

  deleteSelected() {
    const deletedCount = this.selection.selected.length;
    this.service.remove(this.selection.selected.map(s => s.id)).then(() => {
      this.selection.clear();
      this.message.open(
        `Deleted ${deletedCount} item${deletedCount > 1 ? 's' : ''}!`,
        'Close'
      );
    });
  }

  resetForm() {
    if (this.formRef) {
      this.formRef.resetForm();
    }
  }

  async onSubmit() {
    const data = { ...this.ingredientForm.value, userId: this.auth.userId };
    const id = this.query.getActiveId();

    if (id) {
      await this.service.update({ id, ...data });
    } else {
      const ingredient = createIngredient(data);
      await this.service.add(ingredient);
    }

    this.removeActive();
  }

  removeActive() {
    const id = this.query.getActiveId();

    if (id) {
      this.store.removeActive(id);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
