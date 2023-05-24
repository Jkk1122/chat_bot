$(function(){
        // 初始化右侧滚动条
        // 这个方法定义在scroll.js中
        resetui()

        //为发送按钮绑定点击事件
        $('#btnSend').on('click',function(){
            //获取用户输入的文本内容
            const text = $('#ipt').val().trim()
            //判断用户的输入是否为空
            if(text.length <= 0){
                return $('#ipt').val('')
            }
            //将用户输入的内容渲染到页面上
            $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>'
            + text +'</span></li>')

            //将文本框置空
            $('#ipt').val('')
            //重置滚动条的位置
            resetui()
            //获取聊天记录
            getMsg(text)
        })

        //发起请求获取聊天记录
        function getMsg(text){
            $.ajax({
                type:'GET',
                url:'http://www.liulongbin.top:3006/api/robot',
                data:{
                    spoken:text
                },
                success:function(res){
                    if(res.message ==='success'){
                        const msg = res.data.info.text
                        $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'
                        + msg +'</span></li>')
                        resetui()

                        //调用msg
                        getVoice(msg)
                    }
                }
            })
        }
        //发起请求将机器人文字变为语音
        function getVoice(text){
            $.ajax({
                type:'GET',
                url:'http://www.liulongbin.top:3006/api/synthesize',
                data:{
                    text:text
                },
                success:function(res){
                    console.log(res);
                    if(res.status ===200){
                        //播放语音
                        $('#voice').attr('src',res.voiceUrl)
                    }
                }
            })
        }
        //按下回车，发送信息
        $('#ipt').on('keyup',function(e){
            if(e.keyCode === 13){
                $('#btnSend').click()
            }
        })
      })