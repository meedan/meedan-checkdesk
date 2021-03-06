<section id="node-<?php print $node->nid; ?>" class="node-<?php print $node->nid; ?> <?php print $classes; ?>"<?php print $attributes; ?>>
  <article class="story">

    <?php if(isset($content['field_lead_image'])) : ?>
      <figure class="media-lead">
        <?php print render($content['field_lead_image']); ?>
      </figure>
    <?php endif; ?>
      
    <?php if (isset($content['field_section'])) : ?>
      <div class="content-labels">
        <div class="content-section-label">
          <?php print render($content['field_section']); ?>
        </div>
      </div>
    <?php endif; ?>
        
    <h1 class="title">
      <?php print render($node->title); ?>
    </h1>

    <div class="story-meta">
      <div class="story-attributes">
        <?php print $creation_info_short; ?>
        <?php if (isset($story_commentcount)) : ?>
          <div class="story-commentcount">
            <a href="<?php print url('node/' . $node->nid, array('fragment' => 'story-comments-' . $node->nid)); ?>">
              <span class="icon-comment-o"><?php print render($story_commentcount); ?></span>
            </a>
          </div>
        <?php endif; ?>
        <?php if (isset($content['links']['checkdesk']['#links'])) : ?>
          <?php print render($content['links']); ?>
        <?php endif; ?>
        <?php if (isset($follow_story)) : ?>
          <div class="story-follow">
            <?php print $follow_story; ?>
          </div>
        <?php endif; ?>
      </div>
    </div>

  	<div class="story-body">
      <?php print render($content['body']); ?>
    </div>
        
    <div class="story-tabs-wrapper">
      <?php print $story_tabs; ?>
    </div>
    
    <!-- collaboration -->
    <?php if($story_links) : ?>
      <div class="story-collaboration-header-wrapper">
        <?php print $story_links; ?>
        <?php if(isset($story_collaborators)) { ?>    
           <?php print $story_collaborators; ?>
        <?php } ?>
      </div>
    <?php endif; ?>

    <div class="story-collaboration-activity-wrapper">
      <?php if(isset($story_collaboration)) : ?>    
        <?php print $story_collaboration; ?>
      <?php endif; ?>
    </div>

    <aside class="story-footer">
      <section class="cd-container cd-container--first">
        <div clas="cd-container__inner">
          <div class="story-updated-at">
            <span class="icon-clock-o"></span><span class="story-updated-at-text"><?php print t('Updated at ') . $updated_at; ?></span>
          </div>
        </div>
      </section>
 
     <!-- tag list -->
      <?php if (isset($content['field_tags'])) : ?>
        <?php print render($content['field_tags']); ?>    
      <?php endif; ?>

    </aside>
  </article>

  <?php if (!empty($most_popular_stories)): ?>
    <div class="most-popular component">
      <?php print $most_popular_stories; ?>
    </div>
  <?php endif; ?>
  
</section>

<?php if (isset($more_stories)): ?>
  <aside class="onward" role="complementary">
    <?php print $more_stories; ?>
  </aside>
<?php endif; ?>
    
<!-- story comments -->
<div class="story-comments" id="story-comments-<?php print $node->nid; ?>">
  <?php if (isset($content['custom_comments'])) print render($content['custom_comments']); ?>
</div>
