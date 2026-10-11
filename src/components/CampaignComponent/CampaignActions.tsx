import React, { useState } from 'react';
import { Button, ICONS } from '../shared';
import { Campaign } from '../../types/types';
import StartFill from './StartFill.svg';

export interface CampaignActionsProps {
  campaign: Campaign;
  onDownload: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
  onStart: (campaign: Campaign) => void;
}

export const CampaignActions: React.FC<CampaignActionsProps> = ({
  campaign,
  onDownload,
  onEdit,
  onDelete,
  onStart,
}) => {
  const [isHoveringStart, setIsHoveringStart] = useState(false);
  const [isHoveringEdit, setIsHoveringEdit] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const [isHoveringDownload, setIsHoveringDownload] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        icon={isHoveringStart ? undefined : StartFill}
        iconAlt="Start"
        onClick={() => onStart(campaign)}
        ariaLabel={`Start ${campaign.name}`}
        disabled={campaign.status === 'READY'}
        onMouseEnter={() => setIsHoveringStart(true)}
        onMouseLeave={() => setIsHoveringStart(false)}
      >
        {isHoveringStart ? 'Start' : ''}
      </Button>
      <Button
        variant="ghost"
        icon={isHoveringEdit ? undefined : ICONS.edit}
        iconAlt="Edit"
        onClick={() => onEdit(campaign)}
        ariaLabel={`Edit ${campaign.name}`}
        onMouseEnter={() => setIsHoveringEdit(true)}
        onMouseLeave={() => setIsHoveringEdit(false)}
      >
        {isHoveringEdit ? 'Edit' : ''}
      </Button>
      <Button
        variant="ghost"
        icon={isHoveringDelete ? undefined : ICONS.delete}
        iconAlt="Delete"
        onClick={() => onDelete(campaign)}
        ariaLabel={`Delete ${campaign.name}`}
        onMouseEnter={() => setIsHoveringDelete(true)}
        onMouseLeave={() => setIsHoveringDelete(false)}
      >
        {isHoveringDelete ? 'Delete' : ''}
      </Button>
      <Button
        variant="ghost"
        icon={isHoveringDownload ? undefined : ICONS.download}
        iconAlt="Download"
        onClick={() => onDownload(campaign)}
        disabled={campaign.status !== 'READY'}
        ariaLabel={`Download ${campaign.name}`}
        onMouseEnter={() => setIsHoveringDownload(true)}
        onMouseLeave={() => setIsHoveringDownload(false)}
      >
        {isHoveringDownload ? 'Download' : ''}
      </Button>
    </>
  );
};
