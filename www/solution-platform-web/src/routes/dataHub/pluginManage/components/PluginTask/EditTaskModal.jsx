/**
 * Created by john on 2018/1/31.
 */
import PropTypes from 'prop-types';
import T from 'utils/T';
import { PureComponent } from 'react';
import { Modal, Input } from 'antd';
const { TextArea } = Input;
import {
    doGetEditData,
    doSaveEditTask
} from '../../actions/pluginTask';

@T.decorator.propTypes({

    instanceId: PropTypes.string.isRequired,
    nodeIp: PropTypes.string.isRequired,
    nodePort: PropTypes.number.isRequired,
    fileName: PropTypes.string.isRequired,
    getTaskList: PropTypes.func.isRequired,
})
export default class EditTaskModal extends PureComponent {

    state = {
        visible: true,
        content: ''
    }

    componentDidMount() {

        const { instanceId, nodeIp, nodePort, fileName } = this.props;

        doGetEditData(instanceId, nodeIp, nodePort, fileName).then((resp) => {

            this.setState({
                content: resp.data.content
            });

        }, (resp) => {
            T.prompt.error(resp.msg);
        });

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    /**
     * 取消
     */
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    /**
     * 确认
     */
    handleOk = () => {

        const { instanceId, nodeIp, nodePort, fileName } = this.props;
        const { content } = this.state;
        /**
         * 保存编辑
         */
        doSaveEditTask(instanceId, nodeIp, nodePort, fileName, content).then((resp) => {

             this.setState({
                 visible: false
             });

             this.props.getTaskList();

             T.prompt.success('创建成功');

        }, (resp) => {
             T.prompt.error(resp.msg);
        });
    }

    /**
     * 修改编辑内容
     * @param e
     */
    changeText(e) {
        let val = e.target.value;
        this.setState({
            content: val
        });
    }


    render() {

        const { content } = this.state;

        return (
            <Modal
                cancelText="取消"
                okText="提交"
                title="编辑任务"
                width={700}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <TextArea value={content}
                    disabled={false}
                    autosize={{ minRows: 20, maxRows: 25 }}
                    onChange={(e) => this.changeText(e)}
                />
            </Modal>
        );
    }
}
