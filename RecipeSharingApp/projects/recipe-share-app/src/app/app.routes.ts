import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeQueriesComponent } from './queries/recipe-queries.component';
import { QueryWhatCanIMakeComponent } from './queries/query-what-can-i-make.component';
import { QuerySendNoodsComponent } from './queries/query-send-noods.component';
import { QueryAlbannaBrothersComponent } from './queries/query-albanna-brothers.component';
import { QueryNotAlisonComponent } from './queries/query-not-alison.component';
import { QueryFoodNetworkSoupsComponent } from './queries/query-foodnetwork-soups.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'search', component: RecipeSearchComponent },
    { path: 'recipe/:id', component: RecipeDetailComponent },
    { path: 'queries', component: RecipeQueriesComponent },
    { path: 'queries/what-can-i-make', component: QueryWhatCanIMakeComponent },
    { path: 'queries/send-noods', component: QuerySendNoodsComponent },
    { path: 'queries/albanna-brothers', component: QueryAlbannaBrothersComponent },
    { path: 'queries/not-alison', component: QueryNotAlisonComponent },
    { path: 'queries/foodnetwork-soups', component: QueryFoodNetworkSoupsComponent }
];
