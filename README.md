#Angular Libraries

This repository contains Angular2 libraries which are hosted under the @tgillespie namespace on npm along with a showcase.

## Overview

### [@tgillespie/ngx-youtube-player](libs/youtube-player)
A component for embedding the YouTube Player and controlling it via the [YouTube iFrame API](https://developers.google.com/youtube/iframe_api_reference).

It makes the iFrame API and player instance available via services and the component attribute. Alternatively, the API and Player instances can be managed with custom services.

It pretty much passes on the iFrame API, provides observables instead of events and adjusts the players for most changes even if the iFrame API would not usually react to the change.

[See here for more](libs/youtube-player)
[See here for a shallow Demo](https://timothygillespie.github.io/AngularLibraries/
)
