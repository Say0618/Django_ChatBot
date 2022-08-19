import os
from calc_algo_v6 import (
    config, 
    parsed_data, 
    calc_results
)

from calc_algo_v6 import (
    process_master_file, 
    process_case_file, 
    do_calculation,
    output_result_to_excel
)


master_path = "/var/www/Django_ChatBot/master_sheets/master_sheet.xlsx"
print(master_path)
write_path = "/var/www/Django_ChatBot/write_sheets/write.xlsx"
interpretation_path ="/var/www/Django_ChatBot/interpretation_sheets/Interpretation_table_v1.xlsx"


process_master_file(master_path)
process_case_file(write_path)
do_calculation()

    
output_file_name = os.getcwd() + '/media/aa_outputs/aaOutputSheet.xlsx'
    
global aa
aa = output_file_name
output_result_to_excel(output_file_name)

def getFeedback(mode):
    time.sleep(7)
    feedbacks = []
    aa_path = aa
    wb1 = openpyxl.load_workbook(aa_path)
    ws1 = wb1.active
    rows_cnt = ws1.max_row
    cols_cnt = ws1.max_column

    wb2 = openpyxl.load_workbook(interpretation_path)
    ws2_user = wb2['User']
    ws2_dic = wb2['Code Dictionary']

    Score = ws1.cell(row=14, column=cols_cnt).value
    Index = int(ws1.cell(row=13, column=cols_cnt).value)  # type: ignore
    print(Index)

    if Index < 0:
        Index = 1
    if Index > 4:
        Index = 5
#when choose test
    if mode == "User":
        if Score == None:
            elem1 = ws2_user.cell(row=3+Index, column=3).value
            elem2 = ws2_user.cell(row=3+Index, column=5).value
            elem3 = ws2_user.cell(row=3+Index, column=6).value
            elem4 = ws2_user.cell(row=3+Index, column=7).value
            feedbacks.extend([elem1, elem2, elem3, elem4])
        else:
            if Score == "A":
                elem1 = ws2_user.cell(row=2, column=3).value
                elem2 = ws2_user.cell(row=2, column=5).value
                elem3 = ws2_user.cell(row=2, column=6).value
                elem4 = ws2_user.cell(row=2, column=7).value
                feedbacks.extend([elem1, elem2, elem3, elem4])
            elif Score == "B":
                elem1 = ws2_user.cell(row=3, column=3).value
                elem2 = ws2_user.cell(row=3, column=5).value
                elem3 = ws2_user.cell(row=3, column=6).value
                elem4 = ws2_user.cell(row=3, column=7).value
                feedbacks.extend([elem1, elem2, elem3, elem4])

        print(feedbacks)
        # print(len(feedbacks))
        return feedbacks
    else:
        top = []
        top1 = ws1.cell(row=3, column=cols_cnt).value
        top2 = ws1.cell(row=5, column=cols_cnt).value
        top3 = ws1.cell(row=7, column=cols_cnt).value
        top.extend([top1, top2, top3])

        predictions = []
        for item in top:
            for r in range(1, rows_cnt):
                if ws2_dic.cell(row=r, column=1).value == item:
                    predictions.append(ws2_dic.cell(row=r, column=2).value)
        
        for x in predictions:
            feedbacks.append(x)
        
        if Score == None:
            elem1 = ws2_user.cell(row=3+Index, column=4).value
            elem2 = ws2_user.cell(row=3+Index, column=5).value
            elem3 = ws2_user.cell(row=3+Index, column=6).value
            elem4 = ws2_user.cell(row=3+Index, column=7).value
            feedbacks.extend([elem1, elem2, elem3, elem4])
        else:
            if Score == "A":
                elem1 = ws2_user.cell(row=2, column=4).value
                elem2 = ws2_user.cell(row=2, column=5).value
                elem3 = ws2_user.cell(row=2, column=6).value
                elem4 = ws2_user.cell(row=2, column=7).value
                feedbacks.extend([elem1, elem2, elem3, elem4])
            elif Score == "B":
                elem1 = ws2_user.cell(row=3, column=4).value
                elem2 = ws2_user.cell(row=3, column=5).value
                elem3 = ws2_user.cell(row=3, column=6).value
                elem4 = ws2_user.cell(row=3, column=7).value
                feedbacks.extend([elem1, elem2, elem3, elem4])
       

        print(feedbacks)
        # print(len(feedbacks))
        return feedbacks

get_Feedback()