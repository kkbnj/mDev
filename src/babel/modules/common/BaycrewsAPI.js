class GetItemStatus {
  success() {
    console.log('success BaycrewsAPI.js')
    this.url = this.item_data.data.detail_url

    if(this.color) {
      this.url = this.url + '?q_sclrcd=' + this.color
    }

    $('a', this.$target).attr({
      href: this.url,
    })
  }

  fail() {
    console.log('fail BaycrewsAPI.js')
    if(!$('a', this.$target).attr('href')) {
      this.$target.addClass('disable')
    }
  }

  get() {
    $.ajax({
      url: this.endpoint,
    })
      .done((item_data) => {
        console.log('done BaycrewsAPI.js')
        this.item_data = item_data

        if(this.item_data.status !== 'success') {
          this.fail()
          console.log(item_data)

        } else {
          this.success()
        }
      })
      .fail(() => {
        this.fail()
      })
  }

  constructor($target) {
    console.log('run BaycrewsAPI.js')

    this.$target = $target
    this.id = this.$target.attr('data-id')
    this.color = this.$target.attr('data-color')
    this.endpoint = 'https://baycrews.jp/web-api/v1/item/detail/' + this.id

    this.get()
  }
}

class BaycrewsAPI {
  constructor() {
    $('.BaycrewsAPI').each(function() {
      new GetItemStatus($(this))
    })
  }
}

export default BaycrewsAPI
