export type DistintivoAmbiental = "B" | "C" | "ECO" | "CERO" | "SIN";

export type VehiculoData = {
  matricula: string;
  distintivo: DistintivoAmbiental;
  codigo?: string;
  marca?: string;
  modelo?: string;
  combustible?: string;
  anio?: number | string;
  categoria?: string;
  emisionesEuro?: string;
};

const BADGE_SRC: Record<DistintivoAmbiental, string> = {
  CERO: "/assets/distintivos/cero.png",
  ECO: "/assets/distintivos/eco.png",
  C: "/assets/distintivos/c.png",
  B: "/assets/distintivos/b.png",
  SIN: "/assets/distintivos/sin.png",
};

interface VehiculoProps {
  vehiculo: VehiculoData;
}

export function Vehiculo({ vehiculo }: VehiculoProps) {
  const imgSrc = BADGE_SRC[vehiculo.distintivo] || BADGE_SRC.SIN;

  return (
    <section className="dgt-vehicle-card">
      <div className="dgt-vehicle-top">
        <div>
          <div className="dgt-plate">{vehiculo.matricula}</div>
          {vehiculo.marca && vehiculo.modelo && (
            <h2 className="dgt-vehicle-title">
              {vehiculo.marca} {vehiculo.modelo}
            </h2>
          )}
        </div>

        <div className="dgt-badge">
          <img
            src={imgSrc}
            alt={`Distintivo ambiental ${vehiculo.distintivo}`}
            loading="lazy"
          />
          <p className="dgt-badge-label">{vehiculo.distintivo}</p>
        </div>
      </div>

      <div className="dgt-vehicle-grid">
        {vehiculo.marca && (
          <div className="dgt-vehicle-item">
            <span className="dgt-vehicle-label">Marca</span>
            <span className="dgt-vehicle-value">{vehiculo.marca}</span>
          </div>
        )}

        {vehiculo.modelo && (
          <div className="dgt-vehicle-item">
            <span className="dgt-vehicle-label">Modelo</span>
            <span className="dgt-vehicle-value">{vehiculo.modelo}</span>
          </div>
        )}

        {vehiculo.combustible && (
          <div className="dgt-vehicle-item">
            <span className="dgt-vehicle-label">Combustible</span>
            <span className="dgt-vehicle-value">{vehiculo.combustible}</span>
          </div>
        )}

        {vehiculo.anio && (
          <div className="dgt-vehicle-item">
            <span className="dgt-vehicle-label">Año de matriculación</span>
            <span className="dgt-vehicle-value">{vehiculo.anio}</span>
          </div>
        )}

        {vehiculo.categoria && (
          <div className="dgt-vehicle-item">
            <span className="dgt-vehicle-label">Categoría</span>
            <span className="dgt-vehicle-value">{vehiculo.categoria}</span>
          </div>
        )}

        {vehiculo.emisionesEuro && (
          <div className="dgt-vehicle-item">
            <span className="dgt-vehicle-label">Normativa Euro</span>
            <span className="dgt-vehicle-value">{vehiculo.emisionesEuro}</span>
          </div>
        )}
      </div>
    </section>
  );
}
