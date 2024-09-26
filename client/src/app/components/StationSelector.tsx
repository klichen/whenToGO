'use client';

import * as React from 'react';
import * as infoFile from '@/utils/stationsInfo.json';
import * as stationInfo from '@/utils/stationCodeLookup.json';
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
import { StationCode } from '@/types/stationTypes';
import { FaXmark } from 'react-icons/fa6';

interface StationSelectorProps {
  value: StationCode | '';
  setValue: React.Dispatch<React.SetStateAction<'' | StationCode>>;
  placeHolder: string;
}

interface Station {
  name: string;
  code: string;
}

interface ServiceLine {
  line: string;
  stations: Station[];
}

const serviceLines: ServiceLine[] = infoFile.serviceLines;
// const stationCodes: StationCode = stationInfo;

export function StationSelector({
  value,
  setValue,
  placeHolder,
}: StationSelectorProps) {
  const [open, setOpen] = React.useState(false);
  //   const [value, setValue] = React.useState('');
  const getStationNameByCode = (code: StationCode): string => {
    return stationInfo[code];
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border-black bg-gray-100"
        >
          {value ? getStationNameByCode(value) : placeHolder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search station..." className="h-9" />
          <CommandList>
            <CommandEmpty>Station not found</CommandEmpty>
            {value !== '' ? (
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
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
            {/* <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup> */}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
