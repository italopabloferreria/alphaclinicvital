import React from 'react';

export interface ClinicLoaderProps {
  /** Optional custom minimum height for the loader wrapper */
  minHeight?: string;
  /** Optional screen-reader label */
  srLabel?: string;
}

export const ClinicLoader: React.FC<ClinicLoaderProps> = ({
  minHeight = '220px',
  srLabel = 'Carregando conteúdo',
}) => {
  return (
    <div
      className="clinic-loader-wrap"
      style={{ minHeight }}
      aria-busy="true"
    >
      <div
        className="clinic-loader"
        role="status"
        aria-live="polite"
        aria-label={srLabel}
      >
        <span className="sr-only">{srLabel}</span>

        <div className="clinic-loader-central">
          <div className="clinic-loader-ring">
            <div className="clinic-loader-core">
              <span className="clinic-loader-label" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicLoader;
