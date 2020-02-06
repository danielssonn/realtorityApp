/*
 * Public API Surface of agm-light-fork
 */

export * from './lib/agm-light-fork.service';
export * from './lib/agm-light-fork.component';
export * from './lib/agm-light-fork.module';
export {GoogleMapsAPIWrapper} from './core/services/google-maps-api-wrapper';
export {CircleManager} from './core/services/managers/circle-manager';
export {InfoWindowManager} from './core/services/managers/info-window-manager';
export {MarkerManager} from './core/services/managers/marker-manager';
export {PolygonManager} from './core/services/managers/polygon-manager';
export {PolylineManager} from './core/services/managers/polyline-manager';
export {KmlLayerManager} from './core/services/managers/kml-layer-manager';
export {DataLayerManager} from './core/services/managers/data-layer-manager';
export {GoogleMapsScriptProtocol, LAZY_MAPS_API_CONFIG, LazyMapsAPILoader, LazyMapsAPILoaderConfigLiteral} from './core/services/maps-api-loader/lazy-maps-api-loader';
export {MapsAPILoader} from './core/services/maps-api-loader/maps-api-loader';
export {NoOpMapsAPILoader} from './core/services/maps-api-loader/noop-maps-api-loader';

