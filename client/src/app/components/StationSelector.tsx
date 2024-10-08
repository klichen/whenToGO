'use client';

import * as React from 'react';
import * as infoFile from '@/utils/stationsInfo.json';
import { cn } from '@/lib/utils';
import { Button } from '@/app/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/app/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover';
import { ServiceLine, StationCode } from '@/types/stationTypes';
import { filterStations, getStationNameByCode } from '@/utils/helpers';

interface StationSelectorProps {
  value: StationCode | '';
  setValue: React.Dispatch<React.SetStateAction<'' | StationCode>>;
  placeHolder: string;
  departureStation?: StationCode | '';
  isDestination: boolean;
}

export function StationSelector({
  value,
  setValue,
  placeHolder,
  departureStation,
  isDestination,
}: StationSelectorProps) {
  const [open, setOpen] = React.useState(false);

  const serviceLines: ServiceLine[] = departureStation
    ? filterStations(infoFile.serviceLines as ServiceLine[], departureStation)
    : (infoFile.serviceLines as ServiceLine[]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isDestination && departureStation === ''}
          className={cn(
            'max-w-full justify-between border-black bg-gray-100 sm:w-full',
            !value && 'font-normal',
          )}
        >
          {value ? getStationNameByCode(value) : placeHolder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[33vh] min-w-full p-0 sm:w-[20vw]">
        <Command
          filter={(value, search) => {
            const stationName = getStationNameByCode(value as StationCode);
            if (
              search &&
              stationName.toLowerCase().includes(search.toLowerCase())
            ) {
              return 1;
            }
            return 0;
          }}
        >
          <CommandInput placeholder="Search station..." className="h-9" />
          <CommandList>
            <CommandEmpty>Station not found</CommandEmpty>
            {value !== '' ? (
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setValue('');
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-red-400">Clear selection</span>
                  </div>
                </CommandItem>
              </CommandGroup>
            ) : null}
            {serviceLines.map((service) => (
              <CommandGroup heading={service.line}>
                {service.stations.map((station) => (
                  <CommandItem
                    key={station.code}
                    value={station.code}
                    onSelect={(currentValue) => {
                      setValue(
                        (currentValue as StationCode) === value
                          ? ''
                          : (currentValue as StationCode),
                      );
                      setOpen(false);
                    }}
                  >
                    {station.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
