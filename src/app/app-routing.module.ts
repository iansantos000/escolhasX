import { CadPortifolioComponent } from './pages/Fotografo/cad-portifolio/cad-portifolio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';

import { Page404Component } from './pages/page404/page404.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CadastrarEnsaiosComponent } from './pages/cadastrar-ensaios/cadastrar-ensaios.component';
import { EscolhasCriarComponent } from './pages/escolhas-criar/escolhas-criar.component';

import { FireManagerExampleComponent } from './fire-manager-example/fire-manager-example/fire-manager-example.component';
import { FirePhotoExampleComponent } from './fire-photo-example/fire-photo-example/fire-photo-example.component';
import { PortifolioPageComponent } from './pages/portifolio-page/portifolio-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent, },
  {path: 'sobre', component: SobreComponent, },
  {path: 'contato', component: ContatoComponent, },
  {path: 'cadastrar-ensaio', component: CadastrarEnsaiosComponent, canActivate: [AuthGuard] },
  {path: 'escolhas', component: EscolhasCriarComponent, canActivate: [AuthGuard] },
  {path: 'cadastrar-portifolios', component: CadPortifolioComponent, canActivate: [AuthGuard] },
  {path: 'portifolios', component: PortifolioPageComponent, canActivate: [AuthGuard] },

  {path: 'uploads', component: FireManagerExampleComponent, canActivate: [AuthGuard] },
  {path: 'uploads-exe', component: FirePhotoExampleComponent, canActivate: [AuthGuard] },

  {path: 'login', component: AuthComponent },

  {path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
