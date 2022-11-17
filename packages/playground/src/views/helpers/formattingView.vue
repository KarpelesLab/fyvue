<script setup>
const cropText = `{{
  $cropText(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pretium augue vel tortor gravida ornare. Mauris in felis semper, tincidunt purus sit amet, tristique ex.'
  )
}}
<br />
{{ $cropText('LOOOOL', 2, '__end__') }}
<br />
{{ $cropText('LOOOOL', 4, '') }}`;
const formatBytes = `{{ $formatBytes(10000) }}<br />
{{ $formatBytes(1000000000000000) }}<br />
{{ $formatBytes(1337, 10) }}`;
const countriesCode = `<pre class="text-xs h-44 overflow-y-scroll">{{ $countries }}</pre>`;
const formatDate = '{{ $formatDate(Date.now()) }}';
const formatDatetime = '{{ $formatDatetime(Date.now()) }}';
const formatTimeago = `{{ $formatDatetime(getTime5MinutesAgo()) }} &gtcc; {{ $formatTimeago(getTime5MinutesAgo()) }}`;
const formatJPZipcode = ' {{$formatJPZipcode(1610032) }}';
const formatKlbRecurringPaymentCycle = `/{{ $formatKlbRecurringPaymentCycle('1m') }}<br />
/{{ $formatKlbRecurringPaymentCycle('3m') }}<br />
/{{ $formatKlbRecurringPaymentCycle() }}<br />
/{{ $formatKlbRecurringPaymentCycle('1h') }}<br />
/{{ $formatKlbRecurringPaymentCycle('2y') }}<br />
/{{ $formatKlbRecurringPaymentCycle('12h') }}<br />`;

const getTime5MinutesAgo = () => {
  const dt = new Date();
  return dt.setMinutes(dt.getMinutes() - 5);
};
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>Formatting helpers</h1>
    <p>
      <b>fyvue</b> provides a collection of formatting helpers available
      directly in the template.
    </p>

    <h4>$formatDate <small>(dt: Date|string)</small></h4>
    <FyDocPreview :component="formatDate" lang="html">
      <template #component>
        {{ $formatDate(Date.now()) }}
      </template>
    </FyDocPreview>
    <h4>$formatDatetime <small>(dt: Date|string)</small></h4>
    <FyDocPreview :component="formatDatetime" lang="html">
      <template #component>
        {{ $formatDatetime(Date.now()) }}
      </template>
    </FyDocPreview>
    <h4>$formatTimeago <small>(dt: Date|string)</small></h4>
    <FyDocPreview :component="formatTimeago" lang="html">
      <template #component>
        {{ $formatDatetime(getTime5MinutesAgo()) }} &gtcc;
        {{ $formatTimeago(getTime5MinutesAgo()) }}
      </template>
    </FyDocPreview>
    <h4>$formatKlbRecurringPaymentCycle <small>(cycle: string)</small></h4>
    <FyDocPreview :component="formatKlbRecurringPaymentCycle" lang="html">
      <template #component>
        /{{ $formatKlbRecurringPaymentCycle('1m') }}<br />
        /{{ $formatKlbRecurringPaymentCycle('3m') }}<br />
        /{{ $formatKlbRecurringPaymentCycle() }}<br />
        /{{ $formatKlbRecurringPaymentCycle('1h') }}<br />
        /{{ $formatKlbRecurringPaymentCycle('2y') }}<br />
        /{{ $formatKlbRecurringPaymentCycle('12h') }}<br />
      </template>
    </FyDocPreview>

    <h4>$formatJPZipcode <small>(zipcode: number|string)</small></h4>
    <FyDocPreview :component="formatJPZipcode" lang="html">
      <template #component>
        {{ $formatJPZipcode(1610032) }}
      </template>
    </FyDocPreview>
    <h4>
      $cropText
      <small
        >(text: string, maxLength?: number = 100, endString? : string =
        '...')</small
      >
    </h4>
    <FyDocPreview :component="cropText" lang="html">
      <template #component>
        {{
          $cropText(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pretium augue vel tortor gravida ornare. Mauris in felis semper, tincidunt purus sit amet, tristique ex.'
          )
        }}
        <br />
        {{ $cropText('LOOOOL', 2, '__end__') }}
        <br />
        {{ $cropText('LOOOOL', 4, '') }}
      </template>
    </FyDocPreview>
    <h4>$formatBytes <small>(bytes: number, decimals? :number = 2)</small></h4>
    <FyDocPreview :component="formatBytes" lang="html">
      <template #component>
        {{ $formatBytes(10000) }}<br />
        {{ $formatBytes(1000000000000000) }}<br />
        {{ $formatBytes(1337, 10) }}
      </template>
    </FyDocPreview>
    <h4>$countries (Klb only)</h4>
    <p>
      Provide an ordered array for selects in <b>$countries.countries</b> and a
      by uuid property: <b>$countries.byUuid(Country__)</b>.
    </p>
    <FyDocPreview :component="countriesCode" lang="html">
      <template #component>
        <pre class="text-xs h-44 overflow-y-scroll">{{ $countries }}</pre>
      </template>
    </FyDocPreview>
  </div>
</template>
