class Activity < ActiveRecord::Base
  def get_message
    if self.key == 'project.is_created'
      content = Project.find(self.trackable_id).name + ' project is created.'
      url = '/projects/' + self.trackable_id.to_s
      icon = 'glyphicon glyphicon-plus'
      { content: content, url: url, icon: icon }
    elsif self.key == 'message.is_created'
      content = 'You received new message: ' + Message.find(self.trackable_id).title + '.'
      url = '/inbox/' + self.trackable_id.to_s
      icon = 'glyphicon glyphicon-envelope'
      { content: content, url: url, icon: icon }
    elsif self.key == 'project.new_sprint'
      content = 'New sprint started on: ' + Project.find(self.trackable_id).name + '.'
      url = '/projects/' + self.trackable_id.to_s + '/board'
      icon = 'glyphicon glyphicon-asterisk'
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