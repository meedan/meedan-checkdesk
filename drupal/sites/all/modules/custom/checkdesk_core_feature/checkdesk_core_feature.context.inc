<?php
/**
 * @file
 * checkdesk_core_feature.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function checkdesk_core_feature_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'all';
  $context->description = 'All pages';
  $context->tag = 'checkdesk';
  $context->conditions = array(
    'sitewide' => array(
      'values' => array(
        1 => 1,
      ),
    ),
    'user' => array(
      'values' => array(
        'authenticated user' => 'authenticated user',
      ),
    ),
  );
  $context->reactions = array();
  $context->condition_mode = 1;

  // Translatables
  // Included for use with string extractors like potx.
  t('All pages');
  t('checkdesk');
  $export['all'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'search';
  $context->description = 'search form';
  $context->tag = 'checkdesk';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'search' => 'search',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views--exp-checkdesk_search-page' => array(
          'module' => 'views',
          'delta' => '-exp-checkdesk_search-page',
          'region' => 'sidebar_second',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 1;

  // Translatables
  // Included for use with string extractors like potx.
  t('checkdesk');
  t('search form');
  $export['search'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'story';
  $context->description = 'Story edit page';
  $context->tag = 'checkdesk';
  $context->conditions = array(
    'node' => array(
      'values' => array(
        'discussion' => 'discussion',
      ),
      'options' => array(
        'node_form' => '2',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-7f1214ac048b1b97ff90734cd13cc743' => array(
          'module' => 'views',
          'delta' => '7f1214ac048b1b97ff90734cd13cc743',
          'region' => 'sidebar_first',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Story edit page');
  t('checkdesk');
  $export['story'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'update';
  $context->description = 'Update page';
  $context->tag = 'checkdesk';
  $context->conditions = array(
    'node' => array(
      'values' => array(
        'post' => 'post',
      ),
      'options' => array(
        'node_form' => '2',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-7f1214ac048b1b97ff90734cd13cc743' => array(
          'module' => 'views',
          'delta' => '7f1214ac048b1b97ff90734cd13cc743',
          'region' => 'sidebar_first',
          'weight' => '-9',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Update page');
  t('checkdesk');
  $export['update'] = $context;

  return $export;
}
