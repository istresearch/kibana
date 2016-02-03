import moment from 'moment';
import dateRange from 'ui/utils/date_range';
import 'ui/directives/validate_date_math';
import AggTypesBucketsBucketAggTypeProvider from 'ui/agg_types/buckets/_bucket_agg_type';
import AggTypesBucketsCreateFilterDateRangeProvider from 'ui/agg_types/buckets/create_filter/date_range';
import RegistryFieldFormatsProvider from 'ui/registry/field_formats';

export default function DateRangeAggDefinition(Private, config) {
  var BucketAggType = Private(AggTypesBucketsBucketAggTypeProvider);
  var createFilter = Private(AggTypesBucketsCreateFilterDateRangeProvider);
  var fieldFormats = Private(RegistryFieldFormatsProvider);


  return new BucketAggType({
    name: 'date_range',
    title: 'Date Range',
    createFilter: createFilter,
    getKey: function (bucket, key, agg) {
      var formatter = agg.fieldOwnFormatter('text', fieldFormats.getDefaultInstance('date'));
      return dateRange.toString(bucket, formatter);
    },
    getFormat: function () {
      return fieldFormats.getDefaultInstance('string');
    },
    makeLabel: function (aggConfig) {
      return aggConfig.params.field.displayName + ' date ranges';
    },
    params: [{
      name: 'field',
      filterFieldTypes: 'date',
      default: function (agg) {
        return agg.vis.indexPattern.timeFieldName;
      }
    }, {
      name: 'ranges',
      default: [{
        from: 'now-1w/w',
        to: 'now'
      }],
      editor: require('ui/agg_types/controls/date_ranges.html')
    }]
  });
};
