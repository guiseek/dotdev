---
title: Padrões de Design e Boas Práticas com Angular
description: bla bla bla
subject: larara
author: Guilherme Siquinelli
---

# Compreendendo a Injeção de Dependência

A Injeção de Dependência, ou DI, é um dos conceitos fundamentais no Angular. A DI está integrada ao framework Angular e permite que classes com decoradores do Angular, como Componentes, Diretivas, Pipes e Injetáveis, configurem as dependências de que precisam.

Existem dois papéis principais no sistema de DI: consumidor de dependência e provedor de dependência.

O Angular facilita a interação entre consumidores e provedores de dependência usando uma abstração chamada [`Injector`](https://angular.dev/api/core/Injector). Quando uma dependência é solicitada, o injetor verifica seu registro para ver se já existe uma instância disponível lá. Se não houver, uma nova instância é criada e armazenada no registro. O Angular cria um injetor de escopo global para a aplicação (também conhecido como "injetor raiz") durante o processo de inicialização da aplicação. Na maioria dos casos, você não precisa criar injetores manualmente, mas é importante saber que há uma camada que conecta provedores e consumidores.

Este tópico aborda cenários básicos de como uma classe pode atuar como uma dependência. O Angular também permite que você use funções, objetos, tipos primitivos como string ou Boolean, ou qualquer outro tipo como dependências. Para obter mais informações, consulte [Provedores de Dependência](https://angular.dev/guide/di/dependency-injection-providers).

## Fornecendo Dependência

Considere que existe uma classe chamada `HeroService` que precisa atuar como uma dependência em um componente.

O primeiro passo é adicionar o decorador `@Injectable` para mostrar que a classe pode ser injetada.

```typescript
@Injectable()
class HeroService {}
```

O próximo passo é disponibilizá-lo na DI ao fornecê-lo. Uma dependência pode ser fornecida em vários lugares:

* [**Preferencial**: No nível raiz da aplicação usando `providedIn`.](#preferred-at-the-application-root-level-using-providedin)
* [No nível do Componente.](#at-the-component-level)
* [No nível raiz da aplicação usando `ApplicationConfig`.](#at-application-root-level-using-applicationconfig)
* [Aplicações baseadas em `NgModule`.](#ngmodule-based-applications)

### **Preferencial**: No nível raiz da aplicação usando `providedIn`

Fornecer um serviço no nível raiz da aplicação usando `providedIn` permite injetar o serviço em todas as outras classes.
Usar `providedIn` permite que otimizadores de código Angular e JavaScript removam efetivamente serviços que não são utilizados (conhecido como tree-shaking).

Você pode fornecer um serviço usando `providedIn: 'root'` no decorador `@Injectable`:

```typescript
@Injectable({
  providedIn: 'root'
})
class HeroService {}
```

Quando você fornece o serviço no nível raiz, o Angular cria uma única instância compartilhada do `HeroService` e a injeta em qualquer classe que a solicite.

### No nível do Componente

Você pode fornecer serviços no nível do `@Component` usando o campo `providers` do decorador `@Component`.
Nesse caso, o `HeroService` fica disponível para todas as instâncias desse componente e para outros componentes e diretivas usados no template.

Por exemplo:

```typescript
@Component({
  standalone: true,
  selector: 'hero-list',
  template: '...',
  providers: [HeroService]
})
class HeroListComponent {}
```

Ao registrar um provedor no nível do componente, você obtém uma nova instância do serviço com cada nova instância desse componente.

Nota: Declarar um serviço dessa maneira faz com que `HeroService` seja sempre incluído em sua aplicação, mesmo que o serviço não seja utilizado.

### No nível raiz da aplicação usando `ApplicationConfig`

Você pode usar o campo `providers` do `ApplicationConfig` (passado para a função `bootstrapApplication`) para fornecer um serviço ou outro `Injectable` ao nível da aplicação.

No exemplo abaixo, o `HeroService` está disponível para todos os componentes, diretivas e pipes.

```typescript
export const appConfig: ApplicationConfig = {
    providers: [
      { provide: HeroService },
    ]
};
```

Em seguida, em `main.ts`:

```typescript
bootstrapApplication(AppComponent, appConfig)
```

Nota: Declarar um serviço dessa maneira faz com que `HeroService` seja sempre incluído em sua aplicação, mesmo que o serviço não seja utilizado.

### Aplicações baseadas em `NgModule`

Aplicações baseadas em `@NgModule` usam o campo `providers` do decorador `@NgModule` para fornecer um serviço ou outro `Injectable` ao nível da aplicação.

Um serviço fornecido em um módulo está disponível para todas as declarações do módulo ou para quaisquer outros módulos que compartilhem o mesmo `ModuleInjector`.
Para entender todos os casos especiais, consulte [Injetores Hierárquicos](https://angular.dev/guide/di/hierarchical-dependency-injection).

Nota: Declarar um serviço usando `providers` faz com que o serviço seja incluído em sua aplicação, mesmo que o serviço não seja utilizado.

## Injetando/Consumindo uma Dependência

A maneira mais comum de injetar uma dependência é declará-la no construtor de uma classe. Quando o Angular cria uma nova instância de uma classe de componente, diretiva ou pipe, ele determina quais serviços ou outras dependências essa classe precisa, observando os tipos de parâmetros do construtor. Por exemplo, se o `HeroListComponent` precisa do `HeroService`, o construtor pode se parecer com isso:

```typescript
@Component({ ... })
class HeroListComponent {
  constructor(private service: HeroService) {}
}
```

Outra opção é usar o método [inject](https://angular.dev/api/core/inject):

```typescript
@Component({ ... })
class HeroListComponent {
  private service = inject(HeroService);
}
```

Quando o Angular descobre que um componente depende de um serviço, ele primeiro verifica se o injetor possui alguma instância existente desse serviço. Se uma instância do serviço solicitada ainda não existe, o injetor a cria usando o provedor registrado e a adiciona ao injetor antes de devolver o serviço ao Angular.

Quando todos os serviços solicitados foram resolvidos e devolvidos, o Angular pode chamar o construtor do componente com esses serviços como argumentos.