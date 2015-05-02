class Activity < ActiveRecord::Base
  def get_message
    if self.key == 'project.is_created'
      content = Project.find(self.trackable_id).name + ' project is created.'
      url = '/projects/' + self.trackable_id.to_s
      icon = 'glyphicon glyphicon-plus'
      { content: content, url: url, icon: icon }
    end
  end

  def serializable_hash options={}
    {
      msg:              self.get_message,
      key:              key,
      timestamp:        created_at.strftime('%d.%m.%Y %H:%M:%S')
    }
  end
end