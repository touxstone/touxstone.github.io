// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored) {
  return '<div style="display: none"><span id="subtitle">môi trường lập trình trực quan</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Xem code đã tạo bằng JavaScript.</span><span id="linkTooltip">Lưu và lấy địa chỉ liên kết.</span><span id="runTooltip">Chạy chương trình.</span><span id="runProgram">Chạy</span><span id="resetProgram">Trở Về</span><span id="dialogOk">OK</span><span id="dialogCancel">Hủy</span><span id="catLogic">Lôgit</span><span id="catLoops">Vòng lặp</span><span id="catMath">Toán</span><span id="catText">Văn bản</span><span id="catLists">Danh sách</span><span id="catColour">Màu</span><span id="catVariables">Biến</span><span id="catProcedures">Thủ tục</span><span id="httpRequestError">Hoạt động bị trục trặc, không thực hiện được yêu cầu của bạn.</span><span id="linkAlert">Dùng liên kết này để chia sẽ chương trình của bạn:\n\n%1</span><span id="hashError">Không tìm thấy chương trình được lưu ở \'%1\'.</span><span id="xmlError">Không mở được chương trình của bạn.  Có thể nó nằm trong một phiên bản khác của Blockly?</span><span id="listVariable">danh sách</span><span id="textVariable">văn bản</span></div>';
};


apps.dialog = function(opt_data, opt_ignored) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null) + '</div>';
};


apps.ok = function(opt_data, opt_ignored) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof appsIndex == 'undefined') { var appsIndex = {}; }


appsIndex.messages = function(opt_data, opt_ignored) {
  return apps.messages(null) + '<div style="display: none"><span id="indexTitle">Ứng dụng Blockly</ span><span id="indexFooter">Blockly là mã nguồn mở và miễn phí.  Đóng góp mã hoặc bản dịch để Blockly, hoặc sử dụng Blockly trong ứng dụng của riêng bạn, truy cập vào %1.<span></div>';
};


appsIndex.start = function(opt_data, opt_ignored) {
  return appsIndex.messages(null) + '<table><tr><td><h1><span id="title">Ứng dụng Blockly</span></h1></td><td class="farSide"><select id="languageMenu"></select></td></tr><tr><td>Blockly là một môi trường lập trình đồ họa.  Dưới đây là một số ứng dụng mẫu sử dụng Blockly.</td></tr></table><table><tr><td><a href="puzzle/index.html"><img src="index/puzzle.png" height=80 width=100></a></td><td><div><a href="puzzle/index.html">Đố vui</a></div><div>Học cách sử dụng giao diện của Blockly.</div></td></tr><tr><td><a href="maze/index.html"><img src="index/maze.png" height=80 width=100></a></td><td><div><a href="maze/index.html">Ma trận</a></div><div>Sử dụng Blockly để giải quyết một mê cung.</div></td></tr><tr><td><a href="turtle/index.html"><img src="index/turtle.png" height=80 width=100></a></td><td><div><a href="turtle/index.html">Đồ Họa Con Rùa</a></div><div>Sử dụng Blockly để vẽ.</div></td></tr><tr><td><a href="code/index.html"><img src="index/code.png" height=80 width=100></a></td><td><div><a href="code/index.html">Chương trình</a></div><div>Xuất khẩu một chương trình Blockly vào JavaScript, Python hoặc XML.</div></td></tr></table><p><span id="footer_prefix"></span><a href="http://blockly.googlecode.com/">blockly.googlecode.com</a><span id="footer_suffix"></span>';
};
