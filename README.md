# UnityBoxJS
======

@Author Vincent Spiandore ( vincent.spiandore@gmail.com )

_UnityBoxJS est un ensemble de function utile pour unity3D en javascript._

##### Actuellement implémenté : 
* UnitySignal 	- Pattern Signal ( alternative aux `SendMessage( )` )
* SkyConsole 	- Console  

### UnitySignal
=====
Habitué à utiliser ce type de signal en As3 j'ai voulu le porter en Javascript pour Unity3D. Cela propose une alternative au *SendMessage* simple. On `connect` une function a un "channel" puis quand un signal est emis sur le "channel" la function est lancé, avec possibilité de lui passer un Object en param. Une fois la function connecté, le signal peut être émit de n'importe où.

Cette Class functionne avec un enum `SignalEvent` qui regroupe les différents signaux.

1. Connecter un Signal
* connection simple
```Javascript
UnitySignal.connect( maFunction, SignalEvent.CHANNEL, gameObject );
```
* connection sur un channel particilier
```Javascript
UnitySignal.connect( maFunction, SignalEvent.CHANNEL, "monChannel" );
```

2. Déconnecter un Signal
```Javascript
UnitySignal.disconnect( maFunction, SignalEvent.CHANNEL );
```

3. Emettre un Signal
* Signal avec un paramètre
```Javascript
UnitySignal.emit( SignalEvent.CHANNEL, param );
```
* Signal avec un paramètre sur un channel ( seul les signaux connecté avec ce __channel__ seront exécuté ).
```Javascript
UnitySignal.emit( SignalEvent.CHANNEL, "monChannel", param );
```
* Signal sans paramètre
```Javascript
UnitySignal.emit( SignalEvent.CHANNEL );
```
* Signal sans paramètre sur un channel ( seul les signaux connecté avec ce __channel__ seront exécuté ).
```Javascript
UnitySignal.emit( SignalEvent.CHANNEL, "monChannel" );
```