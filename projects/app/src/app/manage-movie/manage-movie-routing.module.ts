import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageMovieComponent } from "./manage-movie.component";
import { SearchMovieComponent } from "./search-movie/search-movie.component";

const manageMovieRoutes: Routes = [
    {
        path: '',
        // canActivate: [AuthGuardService],
        children: [
            { path: 'search', component: SearchMovieComponent },
            { path: '', component: ManageMovieComponent, pathMatch: 'full' },
            // { path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolverService} },
            // { path: ':id/edit', component: RecipeEditComponent }
        ]
    },
]

@NgModule({
    imports:[RouterModule.forChild(manageMovieRoutes)],
    exports: [RouterModule]
})
export class ManageMovieRoutingModule {}