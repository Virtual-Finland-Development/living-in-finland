import { useCallback, useState } from 'react';
import { Button } from 'suomifi-ui-components';
import type { JmfRecommendation, UserOccupation } from '@/types';
import JmfRecommendationsSelect from '../jmf-recommendations/jmf-recommendations';
import OccupationsAdditionalInfo from './occupations-additional-info';

export interface UserOccupationSelection extends UserOccupation {
  label?: string;
}

interface Props {
  userOccupations: UserOccupationSelection[] | null;
  onSave: (selected: UserOccupation[]) => void;
  onClose: () => void;
}

export default function OccupationsEdit(props: Props) {
  const { userOccupations, onClose, onSave } = props;

  const [phase, setPhase] = useState<'selections' | 'additional-info'>(
    'selections'
  );
  const [selected, setSelected] = useState<UserOccupationSelection[]>(
    userOccupations || []
  );

  const selectOccupation = useCallback((occupation: JmfRecommendation) => {
    setSelected(prev => {
      let selected = [...prev];
      const index = selected.findIndex(
        s => s.escoIdentifier === occupation.uri
      );

      if (index > -1) {
        selected = selected.filter((_, i) => i !== index);
      } else {
        selected.push({
          label: occupation.label,
          escoIdentifier: occupation.uri,
          escoCode: '',
          workExperience: 0,
          employer: '',
        });
      }

      return selected;
    });
  }, []);

  const handleSave = () => {
    onSave(
      selected.map(s => ({
        escoIdentifier: s.escoIdentifier!,
        escoCode: '',
        workExperience: 0,
        employer: '',
      }))
    );
  };

  if (phase === 'additional-info') {
    return (
      <OccupationsAdditionalInfo
        selected={selected}
        onBack={() => setPhase('selections')}
        onSave={onSave}
      />
    );
  }

  return (
    <>
      <JmfRecommendationsSelect
        type="occupations"
        isControlled
        controlledSelected={selected.map(s => ({
          uri: s.escoIdentifier,
          label: s.label!,
        }))}
        onSelect={selectOccupation}
        onSave={handleSave}
        onCancel={onClose}
      />

      <div className="flex flecx-row items-start gap-3 mt-4">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          disabled={!selected.length}
          iconRight="arrowRight"
          onClick={() => setPhase('additional-info')}
        >
          ({userOccupations?.length || 0}) Selected
        </Button>
      </div>
    </>
  );
}
