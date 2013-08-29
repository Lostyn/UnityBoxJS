# UnityBoxJS
======

@Author Vincent Spiandore ( vincent.spiandore@gmail.com )

_UnityBoxJS est un ensemble de function utile pour unity3D en javascript._

##### Actuellement implémenté : 
* UnitySignal 	- Pattern Signal ( alternative aux `SendMessage( )` )
* SkyConsole 	- Console  
* StateManager  - FrontController pattern

### UnitySignal
=====
Habitué à utiliser ce type de signal en As3 j'ai voulu le porter en Javascript pour Unity3D. Cela propose une alternative au *SendMessage* simple. On `connect` une function a un "channel" puis quand un signal est emis sur le "channel" la function est lancé, avec possibilité de lui passer un Object en param. Une fois la function connecté, le signal peut être émit de n'importe où.

Cette Class functionne avec un enum `SignalEvent` qui regroupe les différents signaux.

###### Connecter un Signal
* connection simple.

```Javascript
UnitySignal.connect( maFunction, SignalEvent.CHANNEL, gameObject );
```
* connection sur un channel particilier.

```Javascript
UnitySignal.connect( maFunction, SignalEvent.CHANNEL, "monChannel" );
```

###### Déconnecter un Signal
```Javascript
UnitySignal.disconnect( maFunction, SignalEvent.CHANNEL );
```

###### Emettre un Signal
* Signal avec un paramètre.

```Javascript
UnitySignal.emit( SignalEvent.CHANNEL, param );
```
* Signal avec un paramètre sur un channel ( seul les signaux connecté avec ce __channel__ seront exécuté ).

```Javascript
UnitySignal.emit( SignalEvent.CHANNEL, "monChannel", param );
```
* Signal sans paramètre.

```Javascript
UnitySignal.emit( SignalEvent.CHANNEL );
```
* Signal sans paramètre sur un channel ( seul les signaux connecté avec ce __channel__ seront exécuté ).

```Javascript
UnitySignal.emit( SignalEvent.CHANNEL, "monChannel" );
```


### SkyConsole
=====
Il s'agit d'une console visible en jeu touche `F9`. Qui permet d'afficher des informations comme un `print` classique. Il est aussi possible d'y enregistrer des function executable à tous moment. ( Une autoCompletion d'aide est disponible sur la syntax des functions enregistré ).

Cette Class est un singleton.

###### Affiche un message dans la console
```Javascript
SkyConsole.Log( "coucou depuis n'importe où" );
```
###### Enregistrement d'une function
```Javascript
SkyConsole.RegisterCommand( 'functionKey', maFunction, 'Une drecription de la function' );
```

###### Lancer une function
Pour executer une function il suffit d'entrer la functionKey dans la console `functionKey param`.
Deux function sont déjà implémenté dans *Sky*
* clear - Efface le contenu de la console
* help - list l'ensemble des functions enregistré et affiche leur description

### StateManager
===== 
Les dossier JS et C# contienne l'ensemble des scripts utile.
Il suffit d'ajouter StateManager à la scène pour avoir un exemple fonctionnel.

L'ajout de state ce fait dans un `enum State`
Il suffit ensuite d'enregistrer la state avec une `List<StateProcess>`
Javascript
```Javascript
var sSt : List.<StateProcess> = new List.<StateProcess>( );
  sSt.Add( stateIntro );
registerState( State.MA_STATE, sSt );
```
