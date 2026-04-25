import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export function SelectGroup() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
      <NativeSelect className="w-full rounded-xl">
        <NativeSelectOption value="all">Open now</NativeSelectOption>
        <NativeSelectOption value="all-hours">Any time</NativeSelectOption>
        <NativeSelectOption value="breakfast">Breakfast</NativeSelectOption>
        <NativeSelectOption value="lunch">Lunch</NativeSelectOption>
        <NativeSelectOption value="dinner">Dinner</NativeSelectOption>
      </NativeSelect>

      <NativeSelect className="w-full rounded-xl">
        <NativeSelectOption value="nearest">Nearest</NativeSelectOption>
        <NativeSelectOption value="top-rated">Top rated</NativeSelectOption>
        <NativeSelectOption value="most-reviewed">
          Most reviewed
        </NativeSelectOption>
        <NativeSelectOption value="price-low">Lowest price</NativeSelectOption>
      </NativeSelect>

      <NativeSelect className="w-full rounded-xl">
        <NativeSelectOption value="all">All cuisines</NativeSelectOption>
        <NativeSelectOption value="burgers">Burgers</NativeSelectOption>
        <NativeSelectOption value="middle-eastern">
          Middle Eastern
        </NativeSelectOption>
        <NativeSelectOption value="asian">Asian</NativeSelectOption>
        <NativeSelectOption value="desserts">Desserts</NativeSelectOption>
      </NativeSelect>

      <NativeSelect className="w-full rounded-xl">
        <NativeSelectOption value="all">Any price</NativeSelectOption>
        <NativeSelectOption value="$">$</NativeSelectOption>
        <NativeSelectOption value="$$">$$</NativeSelectOption>
        <NativeSelectOption value="$$$">$$$</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}
