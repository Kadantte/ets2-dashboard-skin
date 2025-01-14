import { store as telemetryStore } from '@/store/telemetry.store';
import { flag } from '@/utils/_app';
import { averageDamage, config } from '@/utils/telemetry/_common.utils';

export default class TelemetryTrailer {
  get hasATrailer() {
    return telemetryStore.telemetry.trailer.model.id.length !== 0;
  }
  get isAttached() {
    return telemetryStore.telemetry.trailer.attached;
  }
  get countryIdOfLicensePlate() {
    return telemetryStore.telemetry.trailer.licensePlate.country.id;
  }
  get licensePlate() {
    return telemetryStore.telemetry.trailer.licensePlate.value.replace('.', '');
  }
  get countryFlagOfLicensePlate() {
    return flag(
      this.countryIdOfLicensePlate,
      telemetryStore.telemetry.game.game.id
    );
  }
  get averageDamage() {
    return averageDamage(telemetryStore.telemetry.trailer.damage);
  }
  get chassisDamage() {
    return telemetryStore.telemetry.trailer.damage.chassis * 100;
  }
  get damage() {
    return config('general_damage_accurate') === 'damage-diagnostic'
      ? this.averageDamage
      : Math.floor(this.chassisDamage);
  }
}
