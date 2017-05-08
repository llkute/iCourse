import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  ToolbarAndroid,
  ScrollView
} from 'react-native';


export default class About extends Component {
render(){
    return(
      <View style={styles.parentContainer}>
        {/* <MyToolbar style={styles.toolbar}
               title={'About'}
               navigator={this.props.navigator}
               sidebarRef={this}
               navIcon={require('../icons/back_arrow.png')}
       /> */}
       <ToolbarAndroid
                    title='Điều khoản sử dụng'
                    navIcon={require('../icons/ic_arrow_left_white_24dp.png')}
                    onIconClicked={() => this.props.navigator.push({
                      id: 'mydrawerlayout'
                    })}
          style={styles.toolbar}
          titleColor='white'
        />
        <View style={styles.container}>
          <ScrollView>
            <Text>
            Vui lòng đọc kỹ Thỏa Thuận Sử Dụng (“Thỏa Thuận”) trước khi bạn tiến hành tải, cài đặt, sử dụng tất cả hoặc bất kỳ phần nào của ứng dụng “iCourse” (“Ứng Dụng”) (bao gồm nhưng không giới hạn phần mềm, các file và các tài liệu liên quan) hoặc sử dụng các dịch vụ do HTL cung cấp để kết nối đến Ứng Dụng. Bạn chấp thuận và đồng ý bị ràng buộc bởi các quy định và điều kiện trong Thỏa Thuận này khi thực hiện các thao tác trên đây. Trường hợp bạn không đồng ý với bất kỳ điều khoản sử dụng nào của chúng tôi (phiên bản này và các phiên bản cập nhật), bạn vui lòng không tải, cài đặt, sử dụng Ứng dụng hoặc tháo gỡ Ứng Dụng ra khỏi thiết bị di động của bạn.
          </Text>
          <Text>
1. Cập nhật
Thỏa Thuận này có thể được cập nhật thường xuyên bởi HTL. Phiên bản cập nhật sẽ thay thế cho các quy định và điều kiện trong thỏa thuận ban đầu. Bạn có thể truy cập vào Ứng Dụng để xem nội dung chi tiết của phiên bản cập nhật.
</Text>
<Text>
2. Giới Thiệu Về Ứng Dụng
iCourse là ứng dụng đăng ký khóa học dành riêng cho Đại học Bách khoa Đà Nẵng.
Ứng dụng sử dụng tài khoản sinh viên làm nền tảng với các tính năng chính: (1) Xem các khóa học, (2) Đăng ký khóa học, (3) Xem các khóa học đã đăng ký, (4) Hủy đăng ký, (5) Xem thông tin sinh viên.
Ứng dụng hỗ trợ nền tảng Android 5.0 trở lên.
</Text>
<Text>
3. Quyền Sở Hữu Ứng Dụng
Ứng Dụng này được phát triển và sở hữu bởi HTL, tất cả các quyền sở hữu trí tuệ liên quan đến Ứng Dụng (bao gồm nhưng không giới hạn mã nguồn, hình ảnh, dữ liệu, thông tin, nội dung chứa đựng trong Ứng Dụng; các sửa đổi, bổ sung, cập nhật của Ứng Dụng) và các tài liệu hướng dẫn liên quan (nếu có) sẽ thuộc quyền sở hữu duy nhất bởi HTL và không cá nhân, tổ chức nào được phép sao chép, tái tạo, phân phối, hoặc hình thức khác xâm phạm tới quyền của chủ sở hữu nếu không có sự đồng ý và cho phép bằng văn bản của HTL.
</Text>
<Text>
4. Tài Khoản
Để sử dụng Ứng Dụng bạn phải có tài khoản sinh viên, bạn cam kết rằng việc sử dụng tài khoản phải tuân thủ các quy định của HTL, đồng thời tất cả các thông tin bạn cung cấp cho chúng tôi là đúng, chính xác, đầy đủ với tại thời điểm được yêu cầu. Mọi quyền lợi và nghĩa vụ của bạn sẽ căn cứ trên thông tin tài khoản bạn đã đăng ký, do đó nếu có bất kỳ thông tin sai lệch nào chúng tôi sẽ không chịu trách nhiệm trong trường hợp thông tin đó làm ảnh hưởng hoặc hạn chế quyền lợi của bạn.
</Text>
<Text>
5. Cam Kết Bảo Mật Thông Tin
HTL sử dụng các phương thức truyền tin an toàn https và mã hóa để truyền tải và lưu trữ các dữ liệu cá nhân và giao tiếp của bạn. Chúng tôi cam kết giữ bí mật tất cả thông tin mà bạn cung cấp cho HTL hoặc chúng tôi thu thập từ bạn và không tiết lộ với bất kỳ bên thứ ba nào trừ khi có yêu cầu từ Cơ quan Nhà nước có thẩm quyền.
</Text>
<Text>
6. Phí Và Các Khoản Thu
HTL cam kết không thu bất cứ khoản phí nào từ người dùng cho các dịch vụ cơ bản mà hiện tại chúng tôi đang cung cấp.
</Text>
<Text>
7. Liên Lạc Với Chúng Tôi
­ Địa chỉ email hlt.team@gmail.com

Trân trọng cảm ơn bạn đã sử dụng sản phẩm và dịch vụ của chúng tôi.
          </Text>
          </ScrollView>
        </View>
            {/* </View>
        <Text onPress={() => this.props.navigator.pop()} >hello ahihi</Text>
      </View> */}
        </View>
    )
  }
}
var mausac = '#2aa22a';
var styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
    flex: 1,
    margin : 10
  },
  toolbar: {
      height: 56,
    backgroundColor: mausac,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    width: 200,
    backgroundColor: '#4883da',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
